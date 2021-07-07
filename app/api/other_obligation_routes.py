from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, OtherObligation, other_obligation

other_obligation_routes = Blueprint('other_obligations', __name__)

@other_obligation_routes.route('/createOtherObligation', methods=['POST'])
def createOtherObligation():
  print(request.json)
  new_other_obligation = request.json
  other_obligation = OtherObligation(
    user_id = new_other_obligation['user_id'],
    account_description = new_other_obligation['description'],
    current_balance = new_other_obligation['current_balance'],
    due_date = new_other_obligation['due_date']
  )
  db.session.add(other_obligation)
  db.session.commit()

  return other_obligation.to_dict()

@other_obligation_routes.route('/<int:id>')
def other_obligations(id):
  other_obligations = OtherObligation.query.filter(OtherObligation.user_id == current_user.id).all()
  return {"other_obligations": [other_obligation.to_dict() for other_obligation in other_obligations]}

@other_obligation_routes.route('/edit', methods=['PATCH'])
def edit_other_obligation():
  current_other_obligation = OtherObligation.query.filter(OtherObligation.id == request.json['id']).first()
  current_other_obligation.account_description = request.json['description']
  current_other_obligation.current_balance = request.json['current_balance']
  current_other_obligation.due_date = request.json['due_date']
  db.session.commit()

  return { 'other_obligation': current_other_obligation.to_dict() }

@other_obligation_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_other_obligation(id):
  other_obligation_id = request.json
  other_obligation = OtherObligation.query.filter(OtherObligation.id == other_obligation_id).first()  
  db.session.delete(other_obligation)
  db.session.commit()
  return { 'id': other_obligation_id }
