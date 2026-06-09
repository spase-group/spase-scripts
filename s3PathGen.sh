#!/bin/bash

# Generate archival path for s3 Bucket given an s3 zip file path
#
# Author: Zach Boquet (2026-02-23)

inFile="$1"
result="s3://spase-backups/Archive/SMWT-IHDEA/"
temp="${inFile##*/}"
# Remove alphabetic characters, then remove first and last character, replace dashes with slashes
filtered=$(echo "$temp" | sed 's/[a-zA-Z]//g')
filtered="${filtered:1:-1}"
filtered="${filtered//-//}"
result="${result}${filtered}/backup.zip"
echo "$result"