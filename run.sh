#!/bin/bash
if [[ "$(docker images -q move_tracker 2> /dev/null)" == "" ]]; then
  /bin/bash build_image.sh
fi
docker kill mtracker_container
docker run --rm --name mtracker_container -e POSTGRES_PASSWORD=testpass -it -v $HOME:/root -p 9999:5432 -d move_tracker 2> /dev/null
echo "Waiting 5 seconds for container setup"
sleep 5
echo "Starting Data import on Postgres"
docker exec -d mtracker_container python3 /home/mtracker/import_data.py
echo "Starting the MTracker API"
docker exec -w /home/mtracker/api -d mtracker_container uvicorn main:app --host=0.0.0.0 --port=8000
echo "Data import completed, entering shell."
docker exec -it mtracker_container /bin/bash