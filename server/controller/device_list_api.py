from model.device_list import get_device_list
import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\device_list')


api = Blueprint('device_list_api', __name__)


@api.route('/device_list', methods=['POST'])
def post_data():
    data = request.get_json()
    if data:
        result = []
        if len(data) == 1:
            result += [get_device_list.execute_query_1(data['type'])]
            temp = get_device_list.execute_query_2(data['type'])
            if temp:
                result += [temp]
        else:
            result += [get_device_list.execute_query_3(
                data['type'], data['name'])]
            print(result[0])
            temp = get_device_list.execute_query_4(data['type'], data['name'])
            if temp:
                result += [temp]
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
    else:
        return jsonify({'error': 'No data received'})
