#!/bin/bash
read -p "Enter a password you'd like for the application?: " confirm
if [[ "$(docker images -q move_tracker 2> /dev/null)" == "" ]]; then
  /bin/bash build_image.sh
fi
docker kill mtracker_container
sleep 2
docker run --rm --name mtracker_container -e POSTGRES_PASSWORD=$confirm -it -v $HOME:/root -p 3010-3011:3010-3011 -d move_tracker 2> /dev/null
echo "Waiting 5 seconds for container setup"
sleep 5
echo "Starting the MTracker Services, entering shell."
docker exec -it mtracker_container /bin/bash /home/mtracker/kickstart.sh