import mysql.connector

def login(username,password):
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
            query = "select admin from user where TAI_KHOAN=%s and MAT_KHAU=%s"
            cursor.execute(query, (username, password))
            result = cursor.fetchall()
            return result
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()

def change(username,password,verify):
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
            if password==verify:
                query = "update user set MAT_KHAU=%s where TAI_KHOAN=%s"
                cursor.execute(query, (password,username))
                connection.commit()
                return cursor.rowcount
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        connection.close()

# def check(username):
#     try:
#         config = {
#             'user': 'smarthome',
#             'password': 'smarthome123',
#             'host': 'localhost',
#             'database': 'smart_home',
#         }
#         try:
#             connection = mysql.connector.connect(**config)
#         except Exception as e:
#             print("Error connecting to MySQL:", e)
#         with connection.cursor() as cursor:
#             query = "select TAI_KHOAN from user where TAI_KHOAN=%s"
#             cursor.execute(query, username)
#             # connection.commit()
#             result = cursor.fetchall()
#             return result
#     except Exception as e:
#         print("Error executing query:", e)
#         return None
#     finally:
#         connection.close()