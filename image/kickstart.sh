#!/bin/bash

echo "Starting Data import on Postgres"
python3 /home/mtracker/import_data.py

echo "Starting the MTracker API"
cd /home/mtracker/api && supervisord

echo "Installing serve"
npm install -g serve

echo "Start the MTracker Web App"
cd /home/mtracker/spa && npm install && npm run build && supervisord

echo "Waiting 10 seconds for Services to start"

/bin/bash