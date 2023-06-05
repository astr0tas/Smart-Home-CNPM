import mysql.connector

# Define a function to execute MySQL queries


def get_device_list(type):
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
            query = "SELECT MA_TB,TEN,TRANG_THAI,TU_DONG FROM THIET_BI WHERE MA_TB LIKE '{}%'".format(
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


def get_device_data(type):
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
            query = "SELECT GIA_TRI FROM DU_LIEU_THIET_BI WHERE MA_TB LIKE '{}%' ORDER BY THOI_GIAN DESC LIMIT 1".format(
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


def get_device_list_by_name(type, name):
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
            query = "SELECT MA_TB,TEN,TRANG_THAI,TU_DONG FROM THIET_BI WHERE MA_TB LIKE '{}%' AND TEN LIKE '%{}%'".format(
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


def get_device_data_by_name(type, name):
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
            query = "SELECT GIA_TRI FROM DU_LIEU_THIET_BI JOIN THIET_BI ON DU_LIEU_THIET_BI.MA_TB=THIET_BI.MA_TB"\
                "WHERE MA_TB LIKE '{}%' AND TEN LIKE '%{}%' ORDER BY THOI_GIAN DESC LIMIT 1".format(
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


def get_device_detail(id):
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
            query = "SELECT TEN,TRANG_THAI,TU_DONG FROM THIET_BI WHERE MA_TB='{}'".format(
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


def get_device_data(id):
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
            query = "SELECT GIA_TRI,THOI_GIAN FROM DU_LIEU_THIET_BI WHERE MA_TB='{}' ORDER BY THOI_GIAN DESC LIMIT 1".format(
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


def update_device_status(id, status):
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
            query = "UPDATE THIET_BI SET TRANG_THAI=%s WHERE MA_TB=%s"
            cursor.execute(query, (status, id))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_device_value(id, value):
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
            query = "UPDATE THIET_BI SET GIA_TRI='{}' WHERE MA_TB='{}';".format(
                value, id)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_device_value(id, value):
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
            query = ""  # This query is not right
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def device_increase(id, value):
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
            query = ""  # This query is not right
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def device_decrease(id, value):
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
            query = ""  # This query is not right
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def device_timer(id, start, end):
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
            query = ""  # This query is not right
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_device_auto(id, value):
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
            query = "UPDATE THIET_BI SET TU_DONG=%s WHERE MA_TB=%s"
            cursor.execute(query, (value, id))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def get_device_history(id):
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
            query = "call getDeviceHistory('{}')".format(id)
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
