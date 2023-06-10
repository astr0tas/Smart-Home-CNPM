from model.accounts import query
import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\accounts')


api = Blueprint('accounts', __name__)


@api.route('/accounts', methods=['GET'])
def accounts():
    result = query.accounts()
    if result:
        return jsonify(result)
    else:
        return jsonify({'error': 'Failed to retrieve data from database'})


@api.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json()
    if data:
        result = query.add_account(
            data['name'], data['gender'], data['account'], data['email'], data['phone'], data['ssn'], data['date'], data['password'])
        if result:
            return jsonify({'message':'Database updated'})
        else:
            return jsonify({'error': 'Failed to update database'})
    else:
        return jsonify({'error': 'No data received'})


@api.route('/remove_account', methods=['POST'])
def remove_account():
    data = request.get_json()
    if data:
        result = query.remove_account(data['id'])
        if result:
            return jsonify({'message': 'Database updated'})
        else:
            return jsonify({'error': 'Failed to update database'})
    else:
        return jsonify({'error': 'No data received'})
