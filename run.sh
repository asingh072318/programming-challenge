#!/bin/bash
if [[ "$(docker images -q move_tracker 2> /dev/null)" == "" ]]; then
  /bin/bash build_image.sh
fi
docker run --rm --name mtracker_container -e POSTGRES_PASSWORD=testpass -it -v $HOME:/root -d move_tracker
docker exec -it mtracker_container /bin/bash
