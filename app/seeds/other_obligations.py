from app.models import db, OtherObligation

def seed_other_obligations():

  collection = OtherObligation(user_id=1, account_description='Collections', current_balance='750', due_date=0)
  db.session.add(collection)
  db.session.commit()

def undo_other_obligations():
  db.session.execute("TRUNCATE other_obligations RESTART IDENTITY CASCADE;")
  db.session.commit()
