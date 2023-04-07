from flask import Flask
from flask_cors import CORS
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
import sys
sys.path.append(script_dir+'\\controller')
from controller import sensor_detail_api

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

app.register_blueprint(sensor_detail_api.api)

# Run the server
if __name__ == '__main__':
    app.run(debug=True)