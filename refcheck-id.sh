#!/bin/bash

# Run refcheck ID task and email results
#
# Author: Todd King (2022-03-16)
cd ~/metadata
bash ../spase-scripts/refresh-all.sh &> /dev/null
bash ../spase-scripts/refcheck-all.sh . "-i -e"
