#!/bin/bash
if [[ "$(docker images -q move_tracker 2> /dev/null)" == "" ]]; then
  /bin/bash build_image.sh
fi
docker kill mtracker_container
sleep 2
docker run --rm --name mtracker_container -e POSTGRES_PASSWORD=testpass -it -v $HOME:/root -p 5000:3000 -p 8000:8000 -d move_tracker 2> /dev/null
echo "Waiting 5 seconds for container setup"
sleep 5
# echo "Starting Data import on Postgres"
# docker exec -d mtracker_container python3 /home/mtracker/import_data.py
# echo "Starting the MTracker API"
# docker exec -w /home/mtracker/api -d mtracker_container uvicorn main:app --host=0.0.0.0 --port=8000
# echo "Start the MTracker Web App"
# docker exec -w /home/mtracker/spa -d mtracker_container npm start
echo "Starting the MTracker Services, entering shell."
docker exec -it mtracker_container /bin/bash /home/mtracker/kickstart.sh