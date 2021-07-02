from .db import db

class Account(db.Model):
  __tablename__ = 'accounts'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  account_name = db.Column(db.String(40), nullable = False, unique = True)
  account_type = db.Column(db.String(20), nullable = False)
  balance = db.Column(db.Numeric(asdecimal=False))

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'account_name' : self.account_name,
      'account_type' : self.account_type,
      'balance' : self.balance
    }
