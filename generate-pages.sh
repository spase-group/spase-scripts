#!/bin/bash

# Run landing page generation task 
#
# Author: Todd King (2022-03-16)

TODAY=$(date +%Y-%m-%d)
cd ~/spase-generate-pages
echo "HPDE landing page generation ${TODAY}. New pages only."
bash update-pages.sh
bash push-pages.sh
