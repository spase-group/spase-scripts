#!/bin/bash 

# Refresh (go a "git pull") on one or more folders.

# Arguments
#  $1: Name of parent folder to process (default: current folder)
#
# Author: Todd King - 2022-03-14

FOLDER=${1:-.}

for FILE in ${FOLDER}/*; do
    if [ -d "$FILE" ]; then
        echo "$FILE"
        cd "$FILE"
        git pull
        cd ..
    fi
done