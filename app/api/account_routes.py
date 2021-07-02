from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Account

account_routes = Blueprint('accounts', __name__)

@account_routes.route('/<int:id>')
def accounts(id):
  accounts = Account.query.filter(Account.user_id == current_user.id).all()
  return {"accounts": [account.to_dict() for account in accounts]}

@account_routes.route('/edit', methods=['PATCH'])
def edit_account(id):
  print('*********', request)
  return None
