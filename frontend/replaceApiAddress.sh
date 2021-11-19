#!/bin/bash

# -e stops excecution on error, -x prints all commands to docker build console
set -xe

: "${API_ADDRESS:-'localhost:5000'}"
echo $API_ADDRESS
sed -i "s|API_ADDRESS|$API_ADDRESS|g" /usr/share/nginx/html/static/js/main.*.chunk.js

# Continue with normal excecution
exec "$@"