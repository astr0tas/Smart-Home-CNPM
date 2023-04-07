from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql.cursors

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Configure MySQL connection
connection = pymysql.connect(
    host='localhost',
    user='smarthome',
    password='smarthome123',
    db='smart_home'
    # cursorclass=pymysql.cursors.DictCursor
)

# Define a function to execute MySQL queries
def execute_query(query):
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            connection.commit()
            return result
    except Exception as e:
        print(e)
        return None

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
@app.route('/sensor_detail', methods=['POST'])
def post_data():
    data = request.get_json()
    if data:
        query = f"SELECT * FROM DU_LIEU_CAM_bIEN WHERE MA_CB='{data['id']}'"
        result = execute_query(query)
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

# Run the server
if __name__ == '__main__':
    #app.run(debug=True)
    app.run(debug=False)