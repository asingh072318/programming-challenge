#!/bin/bash
docker rmi move_tracker;
cd image; docker build --no-cache -t move_tracker .
