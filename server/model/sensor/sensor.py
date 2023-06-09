import mysql.connector

# Define a function to execute MySQL queries


def update_sensor_max(id, value, userID):
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
        with connection.cursor() as cursor:
            query = "UPDATE CAM_BIEN SET NGUONG_TREN=%s WHERE MA_CB=%s"
            cursor.execute(query, (value, id))
            query = "insert into THIET_LAP_CAM_BIEN values(now(),%s,%s,null,%s,null)"
            cursor.execute(query, (userID,id,value))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_sensor_min(id, value, userID):
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
        with connection.cursor() as cursor:
            query = "UPDATE CAM_BIEN SET NGUONG_DUOI=%s WHERE MA_CB=%s"
            cursor.execute(query, (value, id))
            query = "insert into THIET_LAP_CAM_BIEN values(now(),%s,%s,null,null,%s)"
            cursor.execute(query, (userID, id, value))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_sensor_status(id, status, userID):
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
        with connection.cursor() as cursor:
            print(id, status)
            query = "UPDATE CAM_BIEN SET TRANG_THAI=%s WHERE MA_CB=%s"
            cursor.execute(query, (status, id))
            query = "insert into THIET_LAP_CAM_BIEN values(now(),%s,%s,%s,null,null)"
            cursor.execute(query, (userID, id, status))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def get_sensor_detail(id):
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
            query = "SELECT TEN,NGUONG_TREN,NGUONG_DUOI,TRANG_THAI FROM CAM_BIEN WHERE MA_CB='{}'".format(
                id)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def get_sensor_history(id):
    try:
        config = {
            'user': 'smarthome',
            'password': 'smarthome123',
            'host': 'localhost',
            'database': 'smart_home'
        }
        try:
            connection = mysql.connector.connect(**config)
        except Exception as e:
            print("Error connecting to MySQL:", e)
        with connection.cursor(dictionary=True) as cursor:
            query = "call getSensorHistory('{}')".format(id)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def get_sensor_list(type):
    try:
        config = {
            'user': 'smarthome',
            'password': 'smarthome123',
            'host': 'localhost',
            'database': 'smart_home'
        }
        try:
            connection = mysql.connector.connect(**config)
        except Exception as e:
            print("Error connecting to MySQL:", e)
        with connection.cursor(dictionary=True) as cursor:
            query = "SELECT MA_CB,TEN,TRANG_THAI FROM CAM_BIEN WHERE MA_CB LIKE '{}%'".format(
                type)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def get_sensor_data(id):
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
            query = "SELECT GIA_TRI,THOI_GIAN FROM DU_LIEU_CAM_BIEN WHERE MA_CB='{}' ORDER BY THOI_GIAN DESC LIMIT 1".format(
                id)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def get_sensor_list_by_name(type, name):
    try:
        config = {
            'user': 'smarthome',
            'password': 'smarthome123',
            'host': 'localhost',
            'database': 'smart_home'
        }
        try:
            connection = mysql.connector.connect(**config)
        except Exception as e:
            print("Error connecting to MySQL:", e)
        with connection.cursor(dictionary=True) as cursor:
            query = "SELECT MA_CB,TEN,TRANG_THAI FROM CAM_BIEN WHERE MA_CB LIKE '{}%' AND TEN LIKE '%{}%'".format(
                type, name)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def getUserID(username):
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
            query = "select ma_user from user where tai_khoan='{}'".format(
                username)
            cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()
