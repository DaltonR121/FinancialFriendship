from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, Account

account_routes = Blueprint('accounts', __name__)

@account_routes.route('/createAccount', methods=['POST'])
def createAccount():
  new_account = request.json
  account = Account(
    user_id = new_account['user_id'],
    account_name = new_account['account_name'],
    account_type = new_account['account_type'],
    balance = new_account['balance']
  )
  db.session.add(account)
  db.session.commit()

  return account.to_dict()

@account_routes.route('/<int:id>')
def accounts(id):
  accounts = Account.query.filter(Account.user_id == current_user.id).all()
  return {"accounts": [account.to_dict() for account in accounts]}

# @account_routes.route('/edit', methods=['PATCH'])
# def edit_account(id):
#   print('*********', request)
#   return None
