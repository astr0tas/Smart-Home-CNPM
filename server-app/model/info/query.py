import mysql.connector


def getInfo(username):
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
            query = "select ma_user,ten,gioi_tinh,cccd,tai_khoan,sdt,email,ngay_sinh from user where tai_khoan='{}'".format(
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


def updateInfo(username, name, gender, date, ssn, email, phone):
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
            query = "update user set ten='{}',gioi_tinh='{}',cccd='{}',sdt='{}',email='{}',ngay_sinh='{}' where tai_khoan='{}'".format(
                name, gender, ssn, phone, email, date, username)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()


def updateInfo(username, name, gender, date, ssn, email, phone, password):
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
            query = "update user set ten='{}',gioi_tinh='{}',cccd='{}',sdt='{}',email='{}',ngay_sinh='{}',mat_khau='{}' where tai_khoan='{}'".format(
                name, gender, ssn, phone, email, date, password, username)
            cursor.execute(query)
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None

    # Close the connection
    finally:
        connection.close()
