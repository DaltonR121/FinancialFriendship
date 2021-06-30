from .db import db

class CreditCards(db.Model):
  __tablename__ = 'credit_cards'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  account_name = db.Column(db.String(50), nullable = False)
  current_balance = db.Column(db.Numeric, nullable = False)
  interest_rate = db.Column(db.Numeric)
  limit = db.Column(db.Numeric)
  due_date = db.Column(db.Integer)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'account_name': self.account_name,
      'current_balance': self.current_balance,
      'interest_rate': self.interest_rate,
      'limit': self.limit,
      'due_date': self.due_date
    }
