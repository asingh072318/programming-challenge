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
    self.statements_template = {
      CREATE_TABLE_KEY: '''CREATE TABLE {} ( {} );''',
      INSERT_ITEM_KEY: '''INSERT INTO {} ( {} ) VALUES ( {} );''',
     }

  def get_statements(self,key,table_name_statement):
    template = self.statements_template[key]
    if key == CREATE_TABLE_KEY:
      return [ template.format(table_name_statement,self.create_table_items_statement(table_name_statement)) ]
    elif key == INSERT_ITEM_KEY:
      list_of_items_to_insert = self.read_table_rows("/home/mtracker/data/{}.csv".format(table_name_statement))
      statement_of_items_to_insert = []
      for item in list_of_items_to_insert:
        statement_of_items_to_insert.append(",".join(item).rstrip(","))
      return [ template.format(table_name_statement,statement_of_item) for statement_of_item in statement_of_items_to_insert ]

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
      return "Successfull", 200
    except psycopg2.Error as e:
      return e

  def getSanitizedColumns(self,table_name):
    return [ re.sub('[^a-zA-Z0-9 _\-\n\.]', '', column_name) for column_name in self.read_table_columns("/home/mtracker/data/{}.csv".format(table_name))]
  
  def create_table_items_statement(self,table_name):
    allowed = string.digits + string.ascii_letters + "_"
    table_columns = self.getSanitizedColumns(table_name)
    statement = "".join("{} varchar(256),".format(table_column) for table_column in table_columns)
    return statement.rstrip(',')

  def read_table_columns(self,path_to_file):
    with open(path_to_file) as csv_file:
      csv_reader = csv.reader(csv_file, delimiter = ',')
      list_of_column_names = []
      for row in csv_reader:
        list_of_column_names = row
        break
      return list_of_column_names[1:]
  
  def read_table_rows(self,path_to_file):
    with open(path_to_file) as csv_file:
      csv_reader = csv.reader(csv_file, delimiter = ',')
      next(csv_reader)
      list_of_rows = []
      for row in csv_reader:
        list_of_rows.append(row)
      return list_of_rows
   
  def get_table_names(self):
    return [ item.split(".")[0] for item in os.listdir("/home/mtracker/data") ]

  def create_tables(self):
    success = []
    for each_table in self.tables:
        statements_to_execute = self.get_statements(CREATE_TABLE_KEY, each_table)
        for statements_to_execute in statements_to_execute:
          try:
            self.execute_sql_statement(statement_to_execute)
            success.append(each_table)
          except Exception as e:
            pass
    if len(success) == len(self.tables):
      return True
    return False
  
  def import_rows(self):
    failures = []
    for each_table in self.tables:
      statements_to_execute = self.get_statements(INSERT_ITEM_KEY, each_table)
      for statement in statements_to_execute:
        try:
          self.execute_sql_statement(statement)
        except Exception as e:
          failures.append(statement)
    if len(failures) == 0:
      return True
    return False

data_object = ImportData()
data_object.create_tables()
data_object.import_rows()
