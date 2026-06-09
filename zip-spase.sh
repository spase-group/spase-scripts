#!/bin/bash

# Zip all SPASE records
#
# Author: Zach Boquet (2026-02-06)

TODAY=$(date +%Y-%m-%d)
cd ~/spase-generate-pages
echo "SPASE Backup ${TODAY}."
#zip -r SPASE_${TODAY}.zip metadata.src/
(cd metadata.src && zip -r "$OLDPWD/SPASE_${TODAY}.zip" .)