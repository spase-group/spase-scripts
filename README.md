# spase-scripts

Shell scripts for working with repositories of SPASE descriptions.

# Getting started

1. Clone this repo.

# Scripts

**clone-all.sh** : Clone all HPDE repositories on GitHub.

**count-all.sh** : Count the number of files with the ".xml" extension in one or more folders.

**refcheck-all.sh** : Perform a referential check of SPASE IDs and URL on the contents of one or more folders.

**refresh-all.sh** : Refresh (do a "git pull") on one or more folders.

**s3PathGen.sh** : Generate a random archival path for an s3 Bucket given an s3 zip file path.

**validate-all.sh** : Validate contents of one or more folders.

**zip-spase.sh** : Zips up all SPASE records.

# Examples
While scripts installed in "/tools/spase"

Count the number of files in the repo clones in the current folder
```
bash /tools/spase/count-all.sh
```

Perform a referential check on all repo clones in the current folder
```
bash /tools/spase/refcheck-all.sh
```

Perform a referential check on all repo clones in the current folder and show just errors
```
bash /tools/spase/refcheck-all.sh . -e
```

Perform a referential check on all repo clones in the "/metadata" folder
```
bash /tools/spase/refcheck-all.sh /metadata
```

