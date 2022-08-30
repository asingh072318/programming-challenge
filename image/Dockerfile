FROM postgres:latest

RUN apt-get update && apt-get install -y \
  bsdmainutils git python3 python3-dev python3-pip vim \
  procps curl libpq-dev \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install fastapi psycopg2 "uvicorn[standard]"

# ADD data /home/mtracker/data
# ADD api /home/mtracker/api
# ADD import_data.py /home/mtracker/

ADD ./* /home/mtracker/
