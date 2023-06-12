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


def update_device_status(id, status, userID):
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
            query = "UPDATE THIET_BI SET TRANG_THAI=%s, THAY_DOI=%s WHERE MA_TB=%s"
            cursor.execute(query, (status, 1, id))
            query = "insert into THIET_LAP_THIET_BI values(now(),%s,%s,%s,null,null)"
            cursor.execute(query, (userID, id, status))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_device_value(id, value, userID):
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
            query = "insert into THIET_LAP_THIET_BI values(NOW(),'{}','{}',NULL,'{}',NULL)".format(
                userID, id, value)
            cursor.execute(query)
            query = "insert into DU_LIEU_THIET_BI values('{}',now(),'{}')".format(
                id, value)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def device_increase(id, value, userID):
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
            query = "insert into THIET_LAP_THIET_BI values(NOW(),'{}','{}',NULL,'{}',NULL)".format(
                userID, id, value)
            cursor.execute(query)
            query = "insert into DU_LIEU_THIET_BI values('{}',now(),'{}')".format(
                id, value)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def device_decrease(id, value, userID):
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
            query = "insert into THIET_LAP_THIET_BI values(NOW(),'{}','{}',NULL,'{}',NULL)".format(
                userID, id, value)
            cursor.execute(query)
            query = "insert into DU_LIEU_THIET_BI values('{}',now(),'{}')".format(
                id, value)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def update_device_auto(id, value, userID):
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
            query = "insert into THIET_LAP_THIET_BI values(now(),%s,%s,NULL,NULL,%s)"
            cursor.execute(query, (userID, id, value))
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
