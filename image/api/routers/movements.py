from fastapi import APIRouter
import os
import psycopg2
router = APIRouter()

PASSWORD_ENV_VAR_KEY = "POSTGRES_PASSWORD"
class SqlHandler:
    def __init__(self):
        self.conn = psycopg2.connect(
                host="0.0.0.0",
                database="postgres",
                user="postgres",
                password=os.getenv(PASSWORD_ENV_VAR_KEY))
        self.response = None
    
    def get_response(self):
        return self.response
    
    def execute_sql_statement(self,statement):
        cur = self.conn.cursor()
        try:
            cur.execute(statement)
            self.response = cur.fetchall()
            # print(self.response)
            self.conn.commit()
            return True
        except psycopg2.Error as e:
            # print(e)
            return False
    
    def get_schema(self,table_name):
        statement = '''SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'public' AND TABLE_NAME = '{}';'''.format(table_name)
        if self.execute_sql_statement(statement):
            self.response = [item for sublist in self.response for item in sublist]
            return self.response
        return "Failed to Get SCHEMA"

# returns array of maps with all movement data
@router.get("/movements/all", tags=["all_movements"])
async def get_movements():
    sqlObj = SqlHandler()
    response_keys = sqlObj.get_schema("movement")
    response_array_of_movements = []
    if sqlObj.execute_sql_statement("SELECT * FROM movement;"):
        response_values_list = sqlObj.get_response()
        for response_value in response_values_list:
            response_movement_item = dict(zip(response_keys,response_value))
            response_array_of_movements.append(response_movement_item)
        return response_array_of_movements
    return [{"id":"Some Random Id","total_animal":"1000","movein":"150","moveout":"100"}]

# all movements from origin premiseid
@router.get("/movements/information", tags=["premiseid"])
async def get_move_data():
    sqlObj = SqlHandler()
    response_keys = ["city_name","premise_id","total_animals"]
    response_array_of_all_premises = []
    statement_to_execute = '''SELECT movement.new_origincity,population.premiseid,population.total_animal FROM population JOIN movement ON movement.new_originpremid=population.premiseid;'''
    if sqlObj.execute_sql_statement(statement_to_execute):
        response_values_list = sqlObj.get_response()
        for response_value in response_values_list:
            response_value_item = dict(zip(response_keys,response_value))
            response_array_of_all_premises.append(response_value_item)
        return response_array_of_all_premises
    return {"No Premises information"}

# all movements from origin premiseid
@router.get("/movements/{premiseid}", tags=["premiseid"])
async def get_move_data(premiseid: str):
    sqlObj = SqlHandler()
    response_keys = sqlObj.get_schema("movement")
    response_array_of_premise_info = []
    statement_to_execute = '''SELECT * FROM movement WHERE new_originpremid='{}';'''.format(premiseid)
    if sqlObj.execute_sql_statement(statement_to_execute):
        response_values_list = sqlObj.get_response()
        for response_value in response_values_list:
            response_value_item = dict(zip(response_keys,response_value))
            response_array_of_premise_info.append(response_value_item)
        return response_array_of_premise_info
    return {"premiseid": premiseid}