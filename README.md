# Details for usage:
1. Must have Docker and git installed.
2. Clone the repository using: `git clone https://github.com/asingh072318/programming-challenge.git mtracker`
3. Goto mtracker directory and run: `sudo ./install.sh`
4. After installation is complete use this to access shell:  `sudo mtracker` => This will ask for a default password(should not be empty).
5. Goto http://localhost:3011


# Programming challenge

## Background
In food animal systems, animals move to different farms as they age. Each farm has a unique ID and must keep a record of the movement of animals from one farm to another. Here, we present some fictitious records of movements among pig farms.

*Description of the data folder* 

*	*movements*: all records of animal movements 
    -  new_originpremid - column with the ID of the origin farm 
    -  new_destinationpremid - column with the ID of the destination farm 
    -  new_numitemsmovedcolumn - column with the number of moved animals

*	*population*: complete list of the farms
    -  premiseid - column with the ID of the farms
    -  total_animal - column with the current number of animals for the farm


## Challenge
The challenge is to create a system to visualize the movement records. This
system have to follow the requirements bellow:

- Has to be composed of 3 components: a REST API, a SPA WEB client, and a
  relational database;
- The relational database can be any database that you like, PostgreSQL, MariaDB
  etc..;
- The data provided in this repo should be imported into the database;
- The REST API has to written in Java, Python or Typescript. It can use any
  framework/library that you desire;
- The Web Client have to written in Typecript, and you can use any *SPA
  framework/library* that you desire, ex Angular, React, etc...;
- Your submitted project should include instructions on how to run it;

The submitted project will be evaluated considering your experience. For example, a
person with a background in backend development will be evaluated with higher
expectations of the API and database code. A UI person will be evaluated with
higher expectations on the design of the UI.

Bonus points will be awarded for creativity and implementing things outside the
requirements, such as:
- having an authentication in the system
- Using docker
- Having a script to run all components
- Importing the supplied data into a well normalized schema

## Submitting
You will have until 11:59pm EST on the 31st of August to submit a github/gitlab
link, or a zipped file via email to <gmachad@ncsu.edu> and <debling@ncsu.edu>
with the subject Programming Challenge.

Good luck!!!
