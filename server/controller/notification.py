from model.notification import query
import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\notification')


api = Blueprint('notification', __name__)


@api.route('/notification', methods=['GET'])
def notification():
    result = query.notification()
    if result:
        return jsonify(result)
    else:
        return jsonify({'error': 'Failed to get data from database'})
