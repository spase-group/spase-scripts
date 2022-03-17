#!/usr/bin/env node
"use strict";
/**
 * Easy email sender. Send emails from a simple command line interface.
 * 
 * To run the tool be sure you have installed:
 * npm install fs
 * npm install path
 * npm install nodemailer
 * npm install yargs
 *
 * @author Todd King
 **/
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const nodemailer = require('nodemailer');

var options  = yargs
	.version('1.0.0')
	.usage('Easy email sender. Send emails from a simple command line interface.')
	.usage('$0 -s {string} -f {from} -p {password} -t {to} [-m {message}]')
	.example('$0 -s "test" -f your@email.com -p yourpassword -t friend@somehwere.com -m "Hi friend"', 'Send an email to "friend@somewhere.com" using the "gmail" service.')
	.epilog('copyright 2022')
	.showHelpOnFail(false, "Specify --help for available options")
	.help('h')
	
	// version
	.options({
		// Verbose flag
		'v' : {
			alias: 'verbose',
			describe : 'show information while processing files',
			type: 'boolean',
			default: false
		},
		
		// help text
		'h' : {
			alias : 'help',
			description: 'show information about the app.'
		},
		
		// Subject
		'a' : {
			alias: 'attachment',
			describe : 'File to attach to message.',
			type: 'string'
		},
    
		// Subject
		's' : {
			alias: 'subject',
			describe : 'Subject line for message.',
			type: 'string'
		},

		// From e-mail address for the email message.
		'f' : {
			alias: 'from',
			describe : 'From e-mail address, also the log-in for the service. If missing user name is used as the from address.',
			type: 'string'
		},
		
		// User name of the account at the delivery service.
		'u' : {
			alias: 'user',
			describe : 'User name of the account at the delivery service.',
			type: 'string'
		},
		
		// Password for the delivery service account
		'p' : {
			alias: 'password',
			describe : 'Password for the service account.',
			type: 'string'
		},
		
		// Address to send the e-mail message.
		't' : {
			alias: 'to',
			describe : 'Address to send the e-mail message.',
			type: 'string'
		},
		
		// Message to send
		'm' : {
			alias: 'message',
			describe : 'Message to send.',
			type: 'string'
		},

		// Service to use
		'x' : {
			alias: 'service',
			describe : 'Service to use to deliver the email.',
			type: 'string',
			default: 'gmail'
		},
	})
  .demandOption(['user', 'password', 'to', 'subject'], 'You must provide the following options: user, password, to, subject')
	.argv
	;

var args = options._;	// Unprocessed command line arguments

// If no from address is given make the same as user name.
if( ! options.from ) {
  options.from = options.user;
}
// If message not provided on command line, read from stdin
if( ! options.message) {
  console.log("Enter message to send:");
  /*
  var buffer = fs.readFileSync(0);
  options.message = buffer.toString();
  console.log(options.message);
  */
  process.stdin.pipe(require('split')()).on('data', function (line) { console.log(line + '!') } );
}

if(options.message.length < 1) {
  console.log("Empty message. Unable to send.")
  return
}

var attachments = [];
if(options.attachment) {
  attachments = [
        {   // stream as an attachment
            filename: path.basename(options.attachment),
            content: fs.createReadStream(options.attachment)
        }
  ]
}

var transporter = nodemailer.createTransport({
  service: options.service,
  auth: {
    user: options.user,
    pass: options.password
  }
});

var mailOptions = {
  from: options.from,
  to: options.to,
  subject: options.subject,
  text: options.message,
  attachments: attachments
};

if(options.verbose) {
  console.log("Sending:")
  console.log(mailOptions);
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
