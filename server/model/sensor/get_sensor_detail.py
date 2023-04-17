import mysql.connector

# Define a function to execute MySQL queries


def execute_query(id):
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
            query = "SELECT DU_LIEU_CAM_BIEN.GIA_TRI," \
                    "DU_LIEU_CAM_BIEN.THOI_GIAN," \
                    "CAM_BIEN.TEN," \
                    "CAM_BIEN.NGUONG_TREN," \
                    "CAM_BIEN.NGUONG_DUOI," \
                    "CAM_BIEN.TRANG_THAI " \
                    "FROM DU_LIEU_CAM_BIEN JOIN CAM_BIEN ON CAM_BIEN.MA_CB=DU_LIEU_CAM_BIEN.MA_CB " \
                    "WHERE DU_LIEU_CAM_BIEN.MA_CB='{}' " \
                    "ORDER BY DU_LIEU_CAM_BIEN.THOI_GIAN desc".format(id)
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
