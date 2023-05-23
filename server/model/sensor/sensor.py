import mysql.connector

# Define a function to execute MySQL queries


def update_sensor_max(id, value):
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
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_sensor_min(id, value):
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
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_sensor_status(id, status):
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
            query = "call getHistory('{}')".format(id)
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
