from .db import db

class MonthlyReoccuring(db.Model):
  __tablename__ = 'monthly_reoccurings'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  account_description = db.Column(db.String(50), nullable = False)
  amount = db.Column(db.Numeric(asdecimal=False))
  due_date = db.Column(db.Integer)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'account_description': self.account_description,
      'amount': self.amount,
      'due_date': self.due_date
    }
