import multiprocessing
import random
import string
import time
import sys
import Adafruit_IO
from Adafruit_IO import MQTTClient
import mysql.connector
from Adafruit_IO import Client, RequestError, Feed

import datetime
# import serial.tools.list_ports
# import sqlite3
# import feedparser

# Kết nối đến Adafruit IO
AIO_USERNAME = "pttien"
AIO_KEY = "aio_Nuxj07CUcyksstE56eZ0reVGSGfg"
client1 = Adafruit_IO.Client(AIO_USERNAME, AIO_KEY)
client = MQTTClient(AIO_USERNAME, AIO_KEY)

# Kết nối đến MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="smarthome",
    password="smarthome123",
    database="smart_home"
)

"""def connected1(client):
    print("Ket noi thanh cong...")
    client.subscribe("yolo-temp")
    client.subscribe("yolo-humi")
    client.subscribe("yolo-light")
    client.subscribe("yolo-move")


def subscribe1(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")


def disconnected1(client):
    print("Ngat ket noi...")
    sys.exit(1)

def message1(client, feed_id, payload):
    print("Nhan du lieu: " + payload)
    
client.on_connect = connected1
client.on_disconnect = disconnected1
client.on_message = message1
client.on_subscribe = subscribe1
client.connect()
client.loop_background()"""

"""def generate_random_string():
    length = 10
    Generate a random string of given length consisting of uppercase letters and digits
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))
def Regenerate_random_string(mydb):
    # Tạo đối tượng cursor để truy vấn
    cursor = mydb.cursor()

    # Tạo chuỗi ngẫu nhiên ban đầu
    random_string = generate_random_string()

   # Truy vấn và kiểm tra xem giá trị ngẫu nhiên mới tạo ra có trùng với giá trị trong cột thứ 2 trên bất kỳ hàng nào trong bảng hay không
    while True:
        query = "SELECT * FROM du_lieu_cam_bien WHERE MA_CB = %s"
        cursor.execute(query, (random_string,))
        row = cursor.fetchone()
        if row is None:
          break
        else:
          random_string = generate_random_string(10)"""


def sensor_process_up():
  
  while True:
    #random_string = generate_random_string()
    # kiem tra trung lap cua gia tri random, neu trung thi random lai
    #Regenerate_random_string(mydb)
    # get sensor in feed2
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
    temp01_status_feed = client1.feeds("temp01-status")
    humi01_status_feed = client1.feeds("humid01-status")
    light01_status_feed = client1.feeds("light01-status")
    move01_status_feed = client1.feeds("ir01-status")
   
    
    # value in feed status
    value01_status_temp = client1.receive(temp01_status_feed.key)
    value01_status_humi = client1.receive(humi01_status_feed.key)
    value01_status_light = client1.receive(light01_status_feed.key)
    value01_status_move = client1.receive(move01_status_feed.key)
    
 
    # get_status
    # lấy ngày giờ hiện tại trong máy tính
    dt1 = datetime.datetime.now()
    
    cursor = mydb.cursor()

    if(value01_status_temp):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s)",('HEAT01', dt1, value_temp.value))
    
    if(value01_status_humi):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s)",('HUMID01', dt1, value_humi.value))
         
    if(value01_status_light):        
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s)",('LIGHT_INTENSE01', dt1, value_light.value))
  
    if(value01_status_move):
            cursor.execute("INSERT INTO du_lieu_cam_bien (MA_CB, THOI_GIAN, GIA_TRI) VALUES (%s,%s,%s)",('IR01', dt1, value_move.value))
                     
    mydb.commit()
    time.sleep(30)
# lấy giá trị mới nhất

def sensor_process_down():
    cursor = mydb.cursor() 

    while True: 
        cursor.execute("SELECT * FROM cam_bien WHERE THAY_DOI = (%s)", (1,))
        result = cursor.fetchall()

        for row in result:
            if row[0] == 'HEAT01':  # MA_CB
                client1.send_data('temp01-status', row[2]) 
                cursor.execute("UPDATE cam_bien SET THAY_DOI = (%s) WHERE MA_CB = (%s)", (0, row[0])) 
            elif row[0] == 'HUMID01':  # MA_CB
                client1.send_data('humid01-status', row[2]) 
                cursor.execute("UPDATE cam_bien SET THAY_DOI = (%s) WHERE MA_CB = (%s)", (0, row[0])) 
            elif row[0] == 'IR01':  # MA_CB
                client1.send_data('ir01-status', row[2]) 
                cursor.execute("UPDATE cam_bien SET THAY_DOI = (%s) WHERE MA_CB = (%s)", (0, row[0])) 
            elif row[0] == 'LIGHT_INTENSE01':  # MA_CB
                client1.send_data('light01-status', row[2]) 
                cursor.execute("UPDATE cam_bien SET THAY_DOI = (%s) WHERE MA_CB = (%s)", (0, row[0])) 
        mydb.commit()
        #time.sleep(0.5)
    
def device_process():
    cursor = mydb.cursor() 

    while True: 
        # status
        cursor.execute("SELECT * FROM thiet_bi WHERE THAY_DOI = (%s)", (1,))
        result = cursor.fetchall()

        for row in result:
            if row[0] == 'FAN01':  # MA_CB
                client1.send_data('fan01-status', row[2]) 
                cursor.execute("UPDATE thiet_bi SET THAY_DOI = (%s) WHERE MA_TB = (%s)", (0, row[0])) 
            elif row[0] == 'LIGHT01':  # MA_CB
                client1.send_data('led01-status', row[2]) 
                cursor.execute("UPDATE thiet_bi SET THAY_DOI = (%s) WHERE MA_TB = (%s)", (0, row[0])) 
                cursor.execute("SELECT * FROM thiet_bi WHERE THAY_DOI = (%s)", (1,))
        
      # auto??        
        """   cursor.execute("SELECT * FROM thiet_bi)
        result = cursor.fetchall()

        for row in result:
            if row[0] == 'FAN01':  # MA_CB
                client1.send_data('fan01-auto', row[1]) 
            elif row[0] == 'LIGHT01':  # MA_CB
                client1.send_data('led01-auto', row[1]) 
        mydb.commit()
        #time.sleep(0.5)"""
      #
     
def child_process():
    p1 = multiprocessing.Process(target=sensor_process_up)
    p2 = multiprocessing.Process(target=device_process)
    p3 = multiprocessing.Process(target=sensor_process_down)
    p1.start()
    p2.start()
    p3.start()
    p1.join()
    p2.join()
    p3.join()
    

if __name__ == '__main__':
    p = multiprocessing.Process(target=child_process)
    p.start()
    p.join()