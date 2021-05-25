#!/bin/bash

cp .env domain1/.env && cp .env domain2/.env

# Kill child processes on shell exit
# trap 'trap - SIGTERM && kill -- -$$' SIGINT SIGTERM EXIT

(cd domain1 && yarn serve --port 8081 &)
(cd domain2 && yarn serve --port 8080 &)
