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
        result = device.get_device_list(data['type'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/device_list/find', methods=['POST'])
def post_device_list_by_name():
    data = request.get_json()
    if data:
        result = device.get_device_list_by_name(data['type'], data['name'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})

@api.route('/device_detail', methods=['POST'])
def post_device_detail():
    data = request.get_json()
    if data:
        result = device.get_device_detail(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/device_list/latest_data', methods=['POST'])
def post_device_latest_data():
    data = request.get_json()
    if data:
        result = device.get_device_data(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/device_status', methods=['POST'])
def post_update_device_status():
    data = request.get_json()
    if data:
        result = device.update_device_status(data['id'], data['status'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/device_auto', methods=['POST'])
def post_update_device_auto():
    data = request.get_json()
    if data:
        result = device.update_device_auto(data['id'], data['auto'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/device_value', methods=['POST'])
def post_update_device_value():
    data = request.get_json()
    if data:
        result = device.update_device_value(data['id'], data['value'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/device_history', methods=['POST'])
def post_device_history():
    data = request.get_json()
    if data:
        result = device.get_device_history(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
