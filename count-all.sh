#!/bin/bash 

# Count the number of files with the ".xml" extension in one or more folders.

# Arguments
#  $1: Name of parent folder to process (default: current folder)
#
# Author: Todd King - 2022-03-14

FOLDER=${1:-.}

for FILE in ${FOLDER}/*; do
    if [ -d "$FILE" ]; then
        echo -n "$FILE : "
        find $FILE -name '*.xml' -print | wc -l
    fi
done