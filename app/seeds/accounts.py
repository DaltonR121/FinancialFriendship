from app.models import db, Account

def seed_accounts():

  checkingacct = Account(user_id=1, account_name='Main Checking', account_type='Checking', balance=8000)
  savingsingacct = Account(user_id=1, account_name='Main Savings', account_type='Savings', balance=25000)
  checkingacct2 = Account(user_id=1, account_name='Secondary Checking', account_type='Checking', balance=3000)
  savingsingacct2 = Account(user_id=1, account_name='Secondary Savings', account_type='Savings', balance=5000)

  db.session.add(checkingacct)
  db.session.add(savingsingacct)
  db.session.add(checkingacct2)
  db.session.add(savingsingacct2)

  db.session.commit()

def undo_accounts():
  db.session.execute("TRUNCATE accounts RESTART IDENTITY CASCADE;")
  db.session.commit()
