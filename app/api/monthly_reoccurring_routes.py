from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, MonthlyReoccurring

monthly_reoccurring_routes = Blueprint('monthly_reoccurring', __name__)

# @monthly_reoccurring_routes.route('/createMonthlyReoccurring', methods=['POST'])
# def createMonthlyReoccurring():
#   print(request.json)
#   new_other_obligation = request.json
#   other_obligation = MonthlyReoccurring(
#     user_id = new_other_obligation['user_id'],
#     account_description = new_other_obligation['description'],
#     current_balance = new_other_obligation['current_balance'],
#     due_date = new_other_obligation['due_date']
#   )
#   db.session.add(other_obligation)
#   db.session.commit()

#   return other_obligation.to_dict()

@monthly_reoccurring_routes.route('/<int:id>')
def monthly_reoccurring(id):
  monthly_reoccurrings = MonthlyReoccurring.query.filter(MonthlyReoccurring.user_id == current_user.id).all()
  return {"monthly_reoccurring": [monthly_reoccurring.to_dict() for monthly_reoccurring in monthly_reoccurrings]}

# @monthly_reoccurring_routes.route('/edit', methods=['PATCH'])
# def edit_other_obligation():
#   current_other_obligation = MonthlyReoccurring.query.filter(MonthlyReoccurring.id == request.json['id']).first()
#   current_other_obligation.account_description = request.json['description']
#   current_other_obligation.current_balance = request.json['current_balance']
#   current_other_obligation.due_date = request.json['due_date']
#   db.session.commit()

#   return { 'other_obligation': current_other_obligation.to_dict() }

# @monthly_reoccurring_routes.route('/delete/<int:id>', methods=['DELETE'])
# def delete_other_obligation(id):
#   other_obligation_id = request.json
#   other_obligation = MonthlyReoccurring.query.filter(MonthlyReoccurring.id == other_obligation_id).first()  
#   db.session.delete(other_obligation)
#   db.session.commit()
#   return { 'id': other_obligation_id }
