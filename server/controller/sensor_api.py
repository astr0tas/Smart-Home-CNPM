import sys
from model.sensor import sensor
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\sensor')


api = Blueprint('sensor_api', __name__)

# Define a route to handle GET requests
# @app.route('/api/get', methods=['GET'])
# def get_data():
#     query = 'SELECT * FROM yourtable'
#     result = execute_query(query)
#     if result:
#         return jsonify(result)
#     else:
#         return jsonify({'error': 'Failed to get data from database'})

# Define a route to handle POST requests


@api.route('/sensor_list', methods=['POST'])
def post_sensor_list():
    data = request.get_json()
    if data:
        result = sensor.get_sensor_list(data['type'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
    

@api.route('/sensor_list/find', methods=['POST'])
def post_sensor_list_by_name():
    data = request.get_json()
    if data:
        result = sensor.get_sensor_list_by_name(data['type'],data['name'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
    
@api.route('/sensor_list/latest_data', methods=['POST'])
def post_sensor_latest_data():
    data = request.get_json()
    if data:
        result = sensor.get_sensor_data(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/sensor_detail', methods=['POST'])
def post_sensor_detail():
    data = request.get_json()
    if data:
        result = sensor.get_sensor_detail(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/sensor_status', methods=['POST'])
def post_update_sensor_status():
    data = request.get_json()
    if data:
        result = sensor.update_sensor_status(data['id'], data['status'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/sensor_min', methods=['POST'])
def post_update_sensor_min():
    data = request.get_json()
    if data:
        result = sensor.update_sensor_min(data['id'], data['value'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/sensor_max', methods=['POST'])
def post_update_sensor_max():
    data = request.get_json()
    if data:
        result = sensor.update_sensor_max(data['id'], data['value'])
        if result:
            return jsonify({"message": "Database updated!"})
        else:
            return jsonify({'error': 'Failed to update data to database'})
    else:
        return jsonify({'error': 'No data received'})


# Define a route to handle PUT requests
# @app.route('/api/put', methods=['PUT'])
# def put_data():
#     data = request.get_json()
#     if data:
#         query = f"UPDATE yourtable SET column1 = '{data['value1']}', column2 = '{data['value2']}' WHERE id = {data['id']}"
#         result = execute_query(query)
#         if result:
#             return jsonify({'success': 'Data updated successfully'})
#         else:
#             return jsonify({'error': 'Failed to update data in database'})
#     else:
#         return jsonify({'error': 'No data received'})

# Define a route to handle DELETE requests
# @app.route('/api/delete', methods=['DELETE'])
# def delete_data():
#     data = request.get_json()
#     if data:
#         query = f"DELETE FROM yourtable WHERE id = {data['id']}"
#         result = execute_query(query)
#         if result:
#             return jsonify({'success': 'Data deleted successfully'})
#         else:
#             return jsonify({'error': 'Failed to delete data from database'})
#     else:
#         return jsonify({'error': 'No data received'})
