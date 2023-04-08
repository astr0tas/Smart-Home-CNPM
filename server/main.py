from controller import sensor_detail_api, device_list_api
from flask_cors import CORS
from flask import Flask
import sys
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(script_dir+'\\controller')

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

app.register_blueprint(sensor_detail_api.api)
app.register_blueprint(device_list_api.api)

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
