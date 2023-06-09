from model.info import query
import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\info')


api = Blueprint('info', __name__)


@api.route('/getInfo', methods=['POST'])
def getInfo():
    data = request.get_json()
    if data:
        result = query.getInfo(data['username'])
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Failed to retrieve data from the database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/updateInfo', methods=['POST'])
def updateInfo():
    data = request.get_json()
    if data:
        if data['password'] != "":
            result = query.updateInfo(data['username'], data['name'], data['gender'],
                                      data['date'], data['ssn'], data['email'], data['phone'], data['password'])
        else:
            result = query.updateInfo(data['username'], data['name'], data['gender'],
                                      data['date'], data['ssn'], data['email'], data['phone'])
        if result:
            return jsonify({'message': 'success!'})
        else:
            return jsonify({'error': 'Failed to retrieve data from the database'})
    else:
        return jsonify({'error': 'No data received'})
