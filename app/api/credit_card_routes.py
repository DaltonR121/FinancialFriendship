from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, CreditCards

credit_card_routes = Blueprint('credit_cards', __name__)

@credit_card_routes.route('/createCreditCard', methods=['POST'])
def create_credit_card():
  new_credit_card = request.json
  credit_card = CreditCards(
    user_id = new_credit_card['user_id'],
    account_name = new_credit_card['account_name'],
    current_balance = new_credit_card['current_balance'],
    interest_rate = new_credit_card['interest_rate'], 
    limit = new_credit_card['limit'],
    due_date = new_credit_card['due_date']
  )
  db.session.add(credit_card)
  db.session.commit()

  return credit_card.to_dict()

@credit_card_routes.route('/<int:id>')
def credit_cards(id):
  cards = CreditCards.query.filter(CreditCards.user_id == current_user.id).all()
  return {"credit_cards": [card.to_dict() for card in cards]}

@credit_card_routes.route('/edit', methods=['PATCH'])
def edit_credit_card():
  current_asset = CreditCards.query.filter(CreditCards.id == request.json['id']).first()
  current_asset.account_name = request.json['account_name']
  current_asset.current_balance = request.json['current_balance']
  current_asset.interest_rate = request.json['interest_rate']
  current_asset.limit = request.json['limit']
  current_asset.due_date = request.json['due_date']

  db.session.commit()

  return { 'creditCard': current_asset.to_dict() }
  return "NONE"

@credit_card_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_asset(id):
  credit_card_id = request.json
  credit_card = CreditCards.query.filter(CreditCards.id == credit_card_id).first()
  
  db.session.delete(credit_card)
  db.session.commit()
  return { 'id': credit_card_id }
