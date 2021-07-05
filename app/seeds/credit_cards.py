from app.models import db, CreditCards

def seed_creditCards():

  amex = CreditCards(user_id=1, account_name='AMEX', current_balance=578, interest_rate=16.35, limit=2500, due_date=22)
  visa = CreditCards(user_id=1, account_name='Visa', current_balance=245, interest_rate=17.85, limit=5000, due_date=5)
  mastercard = CreditCards(user_id=1, account_name='Mastercard', current_balance=835, interest_rate=16.08, limit=1000, due_date=12)

  db.session.add(amex)
  db.session.add(visa)
  db.session.add(mastercard)
  db.session.commit()

def undo_creditCards():
  db.session.execute("TRUNCATE creditCards RESTART IDENTITY CASCADE;")
  db.session.commit()
