import sys
from flask import Blueprint, request, jsonify
import os
script_dir = os.path.abspath(os.path.dirname(__file__))
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
sys.path.append(parent_dir+'\\model\\authentication')

from model.authentication import query


api = Blueprint('authentication', __name__)


@api.route('/login', methods=['POST'])
def authentication():
    data = request.get_json()
    if data:
        result = query.login(data['username'],data['password'])
        if result:
            if result[0][0]:
                return jsonify(1)
            else: return jsonify(2)
        else:
            return jsonify(0)
    else:
        return jsonify({'error': 'No data received'})

@api.route('/change', methods=['POST'])
def change():
    data = request.get_json()
    if data:
        # query = f"SELECT * FROM DU_LIEU_CAM_bIEN WHERE MA_CB='{data['id']}'"
        # checkRes = query.check(data['username'])
        # if not checkRes: return jsonify({'error': 'Not existed data'})
        result = query.change(data['username'],data['password'],data['verify'])
        if result:
            return jsonify(1)
        else: return jsonify(0)
    else:
        return jsonify({'error': 'No data received'})