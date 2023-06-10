import mysql.connector


def accounts():
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
            query = "select MA_USER,ten,email,sdt from user where admin=false"
            cursor.execute(query)
            result = cursor.fetchall()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def remove_account(id):
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
            query = "delete from user where MA_USER=%s"
            cursor.execute(query, (id,))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()


def add_account(name, gender, account, email, phone, ssn, date, password):
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
            query = "INSERT INTO user SELECT CONCAT('USER', (subquery.count + 1)), %s, %s, %s, %s, %s, %s, %s, %s, false FROM(SELECT COUNT(*) AS count FROM user WHERE admin=false) AS subquery"
            cursor.execute(query, (name, gender, ssn,
                           account, password, phone, email, date))
            connection.commit()
            return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()
