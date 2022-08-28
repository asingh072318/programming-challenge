FROM postgres:latest

RUN apt-get update && apt-get install -y \
  bsdmainutils git python3 python3-dev python3-pip vim \
  procps curl libpq-dev \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install fastapi psycopg2 "uvicorn[standard]"

RUN git clone https://github.com/asingh072318/programming-challenge.git /home/mtracker


