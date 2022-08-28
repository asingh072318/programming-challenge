import psycopg2
import csv
import os
import re
import string

CREATE_TABLE_KEY = "CREATE_TABLE"
INSERT_ITEM_KEY = "INSERT_ITEM"
PASSWORD_ENV_VAR_KEY = "POSTGRES_PASSWORD"
class ImportData:
  def __init__(self):
    self.tables = self.get_table_names()
    # self.current_table_index = 0
    # self.current_table_name = self.tables[self.current_table_index]
    # self.current_table_columns = self.read_table_columns("./data/{}.csv".format(self.current_table_name))
    # self.current_table_items_statement = self.create_table_items_statement()
    self.statements_template = {
      "CREATE_TABLE": '''CREATE TABLE {} ( {} );''',
     }

  def get_statement(self,key,table_name_statement,table_items_statement):
    return self.statements_template[key].format(table_name_statement,table_items_statement)

  def execute_sql_statement(self,statement):
    conn = psycopg2.connect(
            host="0.0.0.0",
            database="postgres",
            user="postgres",
            password=os.getenv(PASSWORD_ENV_VAR_KEY))
    cur = conn.cursor()
    try:
      cur.execute(statement)
      conn.commit()
      print("Exec success")
      return "Successfull", 200
    except psycopg2.Error as e:
      print(e)
      return e

  def create_table_items_statement(self,table_name):
    allowed = string.digits + string.ascii_letters + "_"
    table_items = [ re.sub('[^a-zA-Z0-9 _\-\n\.]', '', column_name) for column_name in self.read_table_columns("./data/{}.csv".format(table_name))]
    statement = "".join("{} varchar(256),".format(table_item) for table_item in table_items)
    return statement.rstrip(',')

  def read_table_columns(self,path_to_file):
    with open(path_to_file) as csv_file:
      csv_reader = csv.reader(csv_file, delimiter = ',')
      list_of_column_names = []
      for row in csv_reader:
        list_of_column_names = row
        break
      return list_of_column_names[1:]
   
  def get_table_names(self):
    return [ item.split(".")[0] for item in os.listdir("./data") ]

  def create_tables(self):
    success = []
    for each_table in self.tables:
        statement_to_execute = self.get_statement(CREATE_TABLE_KEY, each_table, self.create_table_items_statement(each_table))
        print(statement_to_execute)
        try:
          self.execute_sql_statement(statement_to_execute)
          success.append(each_table)
        except Exception as e:
          pass
    if len(success) == len(self.tables):
      return True
    return False

data_object = ImportData()
if data_object.create_tables():
  print("Successfully created tables")
else:
  print("Error ")
