FROM postgres:latest

COPY . /home/mtracker/


RUN apt-get update && apt-get install -y \
  bsdmainutils git python3 python3-dev python3-pip vim \
  procps curl libpq-dev  \
  && rm -rf /var/lib/apt/lists/*

RUN /bin/bash /home/mtracker/node_installer.sh

RUN pip3 install fastapi psycopg2 supervisor "uvicorn[standard]"

WORKDIR /home/mtracker/spa

EXPOSE 3010-3011

RUN npm install