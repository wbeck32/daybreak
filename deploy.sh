#!/bin/bash

#This script will upload the recompiled public/ and app.js files#

rsync -t app.js daybreak@198.199.119.168:~/
rsync -rt public daybreak@198.199.119.168:~/
rsync -t package.json daybreak@198.199.119.168:~/
