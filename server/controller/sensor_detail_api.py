from flask import Blueprint,request,jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir= os.path.abspath(os.path.join(script_dir, os.pardir))
import sys
sys.path.append(parent_dir+'\\model\\sensor_detail')

from model.sensor_detail import get_sensor_detail

api = Blueprint('api', __name__)

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
@api.route('/sensor_detail', methods=['POST'])
def post_data():
    data = request.get_json()
    if data:
        # query = f"SELECT * FROM DU_LIEU_CAM_bIEN WHERE MA_CB='{data['id']}'"
        result = get_sensor_detail.execute_query(data['id'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to get data from database'})
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
