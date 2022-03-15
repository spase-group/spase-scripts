#!/bin/bash 

# Perform a referential check of SPASE IDs and URL on the contents of one or more folders.
# Output is as a tab seprated table.
# Folders with the name "Deprecated", "Quarantined" or "testing" are skipped.

# Arguments
#  $1: Name of parent folder to process (default: .)
#  $2: Options to pass to spase-validate (default: )
#
# Author: Todd King - 2022-03-14

FOLDER=${1:-.}
OPTIONS=${2:-}

NOHEADER=""
for ITEM in ${FOLDER}/*; do
# Skip certain folders
    if [[ "$ITEM" == "Deprecated" || "$ITEM" == "Quarantined" || "$ITEM" == "testing" ]]; then
      continue;
    fi
# Perform refcheck if folder
    if [[ -d "$ITEM" ]]; then
        cd "${ITEM}:"
        spase-refcheck -a "$ITEM" -t $NOHEADER -r -u -i ${OPTIONS} .
        cd ..
    fi
    NOHEADER="-b"
done