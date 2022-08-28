#!/bin/bash
docker rmi -f move_tracker;
cd image; docker build --no-cache -t move_tracker .
