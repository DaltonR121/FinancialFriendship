from .db import db

class Asset(db.Model):
  __tablename__ = 'assets'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  asset_description = db.Column(db.String(50), nullable = False)
  current_value = db.Column(db.Numeric, nullable = False)
  amount_owed = db.Column(db.Numeric)
  interest_rate = db.Column(db.Numeric)
  due_date = db.Column(db.Integer)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'asset_description': self.asset_description,
      'current_value': self.current_value,
      'amount_owed': self.amount_owed,
      'interest_rate': self.interest_rate,
      'due_date': self.due_date
    }
