from model.device import device
import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\device')


api = Blueprint('device_api', __name__)


@api.route('/device_list', methods=['POST'])
def post_device_list():
    data = request.get_json()
    if data:
        result = []
        if len(data) == 1:
            result += [device.get_device_list(data['type'])]
            temp = device.get_device_data(data['type'])
            if temp:
                result += [temp]
        else:
            result += [device.get_device_list_by_name(
                data['type'], data['name'])]
            print(result[0])
            temp = device.get_device_data_by_name(data['type'], data['name'])
            if temp:
                result += [temp]
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
