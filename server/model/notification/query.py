import mysql.connector


def notification():
    try:
        config = {
            'user': 'smarthome',
            'password': 'smarthome123',
            'host': 'localhost',
            'database': 'smart_home',
        }
        try:
            connection = mysql.connector.connect(**config)
        except Exception as e:
            print("Error connecting to MySQL:", e)
        with connection.cursor(dictionary=True) as cursor:
            query = "call getNotification();"
            cursor.execute(query)
            result = cursor.fetchall()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()
