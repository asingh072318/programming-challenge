#!/bin/bash

echo "Starting Data import on Postgres"
python3 /home/mtracker/import_data.py

# echo "Starting the MTracker API"
# cd /home/mtracker/api && supervisord

echo "Installing forever, serve"
npm install -g forever serve

echo "Building the MTracker Web App"
cd /home/mtracker/spa && npm run build

echo "Starting the API and Web App"
supervisord -c /home/mtracker/supervisord.conf

echo "Waiting 10 seconds for Services to start"
sleep 10
/bin/bash