import pymysql.cursors

# Configure MySQL connection
connection = pymysql.connect(
    host='localhost',
    user='smarthome',
    password='smarthome123',
    db='smart_home',
    cursorclass=pymysql.cursors.DictCursor
)

# Define a function to execute MySQL queries
def execute_query(id):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM DU_LIEU_CAM_bIEN WHERE MA_CB='{id}'")
            result = cursor.fetchall()
            connection.commit()
            return result
    except Exception as e:
        print(e)
        return None

# Close the connection
connection.close()
