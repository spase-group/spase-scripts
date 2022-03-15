#!/bin/bash 

# Validate contents of one or more folders.
# Folders with the name "Deprecated", "Quarantined" or "testing" are skipped.

# Arguments
#  $1: Name of parent folder to process (default: current folder)
#  $2: Options to pass to spase-validate (default: )
#
# Author: Todd King - 2022-03-14

FOLDER=${1:-.}
OPTIONS=${2:-}

for ITEM in ${FOLDER}/*; do
# Skip certain folders
    if [[ "$ITEM" == "Deprecated" || "$ITEM" == "Quarantined" || "$ITEM" == "testing" ]]; then
      continue;
    fi
# Perform refcheck if folder
    if [[ -d "$ITEM" ]]; then
        echo "${ITEM}:"
        cd "$ITEM"
        spase-validate -r .
        cd ..
    fi
done