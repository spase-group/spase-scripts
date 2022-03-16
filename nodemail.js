#!/usr/bin/env node
"use strict";
/**
 * Easy email sender. Send emails from a simple command line interface.
 * 
 * To run the tool be sure you have installed:
 * npm install nodemailer
 * npm install yargs
 *
 * @author Todd King
 **/
const yargs = require('yargs');
const nodemailer = require('nodemailer');

var options  = yargs
	.version('1.0.0')
	.usage('Easy email sender. Send emails from a simple command line interface.')
	.usage('$0 -s {string} -f {from} -p {password} -t {to} [-m {message}]')
	.example('$0 -s "test" -f your@email.com -p yourpassword -t friend@somehwere.com' -m "Hi friend"', 'Send an email to "friend@somewhere.com" using the "gmail" service.')
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
		's' : {
			alias: 'subject',
			describe : 'Subject line for message.',
			type: 'string',
			default: null
		},

		// From e-mail address, also the log-in for the service.
		'f' : {
			alias: 'from',
			describe : 'From e-mail address, also the log-in for the service.',
			type: 'string',
			default: null
		},
		
		// Password for the service account
		'p' : {
			alias: 'password',
			describe : 'Password for the service account.',
			type: 'string',
      default: null
		},
		
		// Address to send the e-mail message.
		't' : {
			alias: 'to',
			describe : 'Address to send the e-mail message.',
			type: 'string',
      default: null
		},
		
		// Message to send
		'm' : {
			alias: 'message',
			describe : 'Message to send.',
			type: 'string',
			default: null
		},

		// Service to use
		'x' : {
			alias: 'service',
			describe : 'Service to use to deliver the email.",
			type: 'string',
			default: 'gmail'
		},
	})
	.argv
	;

var args = options._;	// Unprocessed command line arguments

var transporter = nodemailer.createTransport({
  service: options.service,
  auth: {
    user: options.from,
    pass: options.password
  }
});

var mailOptions = {
  from: options.from,
  to: options.to,
  subject: options.subject,
  text: options.message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
