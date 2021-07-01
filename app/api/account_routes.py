from flask import Blueprint, jsonify, session, request
from app.models import Account

account_routes = Blueprint('accounts', __name__)

@account_routes.route('/')
def accounts():
    user_accounts = Account.query.all()
    # return {"users": [user.to_dict() for user in users]}
