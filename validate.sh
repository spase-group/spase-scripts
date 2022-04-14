#!/bin/bash

# Run validation task 
#
# Author: Todd King (2022-03-16)

TODAY=$(date +%Y-%m-%d)
cd ~/metadata
bash ../spase-scripts/refresh-all.sh &> /dev/null
echo "HPDE Validation log for ${TODAY}. Errors only."
bash ../spase-scripts/validate-all.sh . -e
