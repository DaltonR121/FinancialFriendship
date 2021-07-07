from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, Asset

asset_routes = Blueprint('assets', __name__)

@asset_routes.route('/createAsset', methods=['POST'])
def createAsset():
  new_asset = request.json
  asset = Asset(
    user_id = new_asset['user_id'],
    asset_description = new_asset['asset_description'],
    current_value = new_asset['asset_current_value'],
    amount_owed = new_asset['asset_amount_owed'],
    interest_rate = new_asset['asset_interest_rate'], 
    due_date = new_asset['asset_due_date']
  )
  db.session.add(asset)
  db.session.commit()

  return asset.to_dict()

@asset_routes.route('/<int:id>')
def assets(id):
  assets = Asset.query.filter(Asset.user_id == current_user.id).all()
  return {"assets": [asset.to_dict() for asset in assets]}

@asset_routes.route('/edit', methods=['PATCH'])
def edit_asset():
  current_asset = Asset.query.filter(Asset.id == request.json['id']).first()
  current_asset.asset_description = request.json['description']
  current_asset.current_value = request.json['current_value']
  current_asset.amount_owed = request.json['amount_owed']
  current_asset.interest_rate = request.json['interest_rate']
  current_asset.due_date = request.json['due_date']

  db.session.commit()

  return { 'asset': current_asset.to_dict() }

@asset_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_asset(id):
  asset_id = request.json
  asset = Asset.query.filter(Asset.id == asset_id).first()
  
  db.session.delete(asset)
  db.session.commit()
  return { 'id': asset_id }
