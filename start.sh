#!/bin/bash

# Kill child processes on shell exit
trap "kill 0" SIGINT

cp .env domain1/.env && cp .env domain2/.env

(cd domain1 && yarn serve --port 8081 &)
(cd domain2 && yarn serve --port 8080 &)
