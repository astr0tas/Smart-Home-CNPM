import random
import string
import time
import sys
import Adafruit_IO
from Adafruit_IO import MQTTClient
import mysql.connector

import datetime
# import serial.tools.list_ports
# import sqlite3
# import feedparser

# Kết nối đến Adafruit IO
AIO_FEED_ID = "yolo-temp"
AIO_USERNAME = "anhkhoa0186"
AIO_KEY = "aio_CwgT43BTdkJNrXWCzyeXe8CpYVMU"
client1 = Adafruit_IO.Client(AIO_USERNAME, AIO_KEY)
client = MQTTClient(AIO_USERNAME, AIO_KEY)


def connected1(client):
    print("Ket noi thanh cong...")
    client.subscribe(AIO_FEED_ID)


def subscribe1(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")


def disconnected1(client):
    print("Ngat ket noi...")
    sys.exit(1)


# Kết nối đến MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="smarthome",
    password="smarthome123",
    database="smart_home"
)


def message1(client, feed_id, payload):
    print("Nhan du lieu: " + payload)


# cursor = mydb.cursor()
# cursor.execute("INSERT INTO cam_bien (MA_CB,TEN,TRANG_THAI,NGUONG_TREN,NGUONG_DUOI,nhietdo) VALUES (%s,%s,%s,%s,%s,%s)", ('HEAT01','metvcl',0,3.1,3.2,payload))
# cursor.execute("INSERT INTO nhiet_do (MA_CB) VALUES (%s)", ('HEAT01',))
#  mydb.commit()

#    ser . write (( str( payload ) + "#") . encode () )
# def getPort():
#   ports = serial.tools.list_ports.comports()
#   N = len(ports)
#   commPort = "None"
#   for i in range(0, N):
#       port = ports[i]
#       strPort = str(port)
#       if "USB Serial Device" in strPort:
#           splitPort = strPort.split(" ")
#          commPort = (splitPort[0])
#   return commPort
# ser = serial.Serial( port=getPort(), baudrate=115200)

client.on_connect = connected1
client.on_disconnect = disconnected1
client.on_message = message1
client.on_subscribe = subscribe1
client.connect()
client.loop_background()


# lấy dữ liệu từ feed
# url = 'https://io.adafruit.com/pttien/feeds/temp/data'
# feed = feedparser.parse(url)

def generate_random_string():
    length = 10
    """Generate a random string of given length consisting of uppercase letters and digits"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))
def Regenerate_random_string(mydb):
    # Tạo đối tượng cursor để truy vấn
    cursor = mydb.cursor()

    # Tạo chuỗi ngẫu nhiên ban đầu
    random_string = generate_random_string(10)

   # Truy vấn và kiểm tra xem giá trị ngẫu nhiên mới tạo ra có trùng với giá trị trong cột thứ 2 trên bất kỳ hàng nào trong bảng hay không
    while True:
        query = "SELECT * FROM du_lieu_cam_bien WHERE MA = %s"
        cursor.execute(query, (random_string,))
        row = cursor.fetchone()
        if row is None:
          break
        else:
          random_string = generate_random_string(10)

    # Khi thoát khỏi vòng lặp, giá trị của random_string đã được tạo ra và không trùng với bất kỳ giá trị nào trong cột thứ 2 của bảng

count = 10
while count:
    random_string = generate_random_string()
    # kiem tra trung lap cua gia tri random, neu trung thi random lai
    Regenerate_random_string(mydb)
    # get sensor in feed
    temp_feed = client1.feeds("yolo-temp")
    humi_feed = client1.feeds("yolo-humi")
    light_feed = client1.feeds("yolo-light")
    move_feed = client1.feeds("yolo-move")
    
    # value in sensors
    value_temp = client1.receive(temp_feed.key)
    value_humi = client1.receive(humi_feed.key)
    value_light = client1.receive(light_feed.key)
    value_move = client1.receive(move_feed.key)
    
    # feed status
    temp_status_feed = client1.feeds("yolo-tem-status")
    humi_status_feed = client1.feeds("yolo-humi-status")
    light_status_feed = client1.feeds("yolo-light-status")
    move_status_feed = client1.feeds("yolo-move-status")
    
    # value in feed status
    value_status_temp = client1.receive(temp_status_feed.key)
    value_status_humi = client1.receive(humi_status_feed.key)
    value_status_light = client1.receive(light_status_feed.key)
    value_status_move = client1.receive(move_status_feed.key)
    
    # get_status
    # lấy ngày giờ hiện tại trong máy tính
    dt1 = datetime.datetime.now()
    # client . publish ("temp", value )
    
    cursor = mydb.cursor()
    # Kiểm tra xem giá trị 'John' đã có trong cột 'name' trong bảng 'users' hay chưa
    # nameTB = 'HEAT01'
    # cursor.execute("SELECT * FROM users WHERE name = nameTB")
    # result = cursor.fetchone()
    # if result:
    # Cập nhật các ô còn lại cho hàng đó
    #  cursor.execute("UPDATE users SET age = 30, gender = 'Male' WHERE name = 'John'")
    #  mydb.commit()
    # else:
    # cursor.execute("UPDATE cam_bien SET TEN=%s, TRANG_THAI=%s WHERE MA_CB=%s",
    #                ('metvcl', 0, 'HEAT01'))
    if(value_status_temp):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HEAT01', random_string, dt1, value_temp.value))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HEAT02', random_string, dt1, value_temp.value-0.5))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HEAT03', random_string, dt1, value_temp.value+0.5))
    if(value_status_humi):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HUMID01', random_string, dt1, value_humi.value))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HUMID02', random_string, dt1, value_humi.value-1))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('HUMID03', random_string, dt1, value_humi.value+1))
    if(value_status_light):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('LIGHT_INTENSE01', random_string, dt1, value_light.value))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('LIGHT_INTENSE02', random_string, dt1, value_light.value-0.5))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('LIGHT_INTENSE03', random_string, dt1, value_light.value+0.5))
    if(value_status_move):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('IR01', random_string, dt1, value_move.value))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('IR02', random_string, dt1, value_move.value-0.5))
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB,MA, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s,%s)",('IR03', random_string, dt1, value_move.value+0.5))
                    
    mydb.commit()

    # Thêm dữ liệu vào MySQL
    # if len(feed.entries) > 0:
    #   latest_entry = feed.entries[0]
    #  value = latest_entry.value
    # print(value,"\n")
    # sql = "INSERT INTO sensor (quat*) VALUES (%s)"
    # val = (value,)
    # mycursor.execute(sql, val)
    # mydb.commit()
    # print(len(feed.entries))

    count -= 1
    time.sleep(10)
# lấy giá trị mới nhất
