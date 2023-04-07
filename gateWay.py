import random
import time
import  sys
from  Adafruit_IO import  MQTTClient
import mysql.connector
import serial . tools . list_ports
import sqlite3
import feedparser

# Kết nối đến Adafruit IO
AIO_FEED_ID =  "temp" 
AIO_USERNAME = "pttien"
AIO_KEY = "aio_gskO80b9K4dagokSrQwe86iv94dj"
client = MQTTClient(AIO_USERNAME , AIO_KEY)
def  connected(client):
    print("Ket noi thanh cong...")
    client.subscribe(AIO_FEED_ID)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)
# Kết nối đến MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="pttien",
    password="73258436",
    database="smart_home"
)

def  message(client , feed_id , payload):
            print("Nhan du lieu: " + payload)
            cursor = mydb.cursor()
            cursor.execute("INSERT INTO cam_bien (MA_CB,TEN,TRANG_THAI,NGUONG_TREN,NGUONG_DUOI,nhietdo) VALUES (%s,%s,%s,%s,%s,%s)", ('HEAT01','metvcl',0,3.1,3.2,payload))
            cursor.execute("INSERT INTO nhiet_do (MA_CB) VALUES (%s)", ('HEAT01',))
            mydb.commit()
    
#    ser . write (( str( payload ) + "#") . encode () )   
#def getPort():
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
#ser = serial.Serial( port=getPort(), baudrate=115200)

client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# lấy dữ liệu từ feed
#url = 'https://io.adafruit.com/pttien/feeds/temp/data'
#feed = feedparser.parse(url)





count = 2
while count :


   #đưa dữ liệu lên feed
    value = random . randint (0 , 100)
    client . publish ("temp", value )
    
    # Thêm dữ liệu vào MySQL
    #if len(feed.entries) > 0:
     #   latest_entry = feed.entries[0]
      #  value = latest_entry.value
       # print(value,"\n")
        #sql = "INSERT INTO sensor (quat*) VALUES (%s)"
        #val = (value,)
        #mycursor.execute(sql, val)
        #mydb.commit()
    #print(len(feed.entries))  
    
    count -= 1
    time . sleep (10)
# lấy giá trị mới nhất

       
        
