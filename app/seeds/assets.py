from app.models import db, Asset

def seed_assets():

  vehicle1 = Asset(user_id=1, asset_description='Vehicle 1', current_value=45000, amount_owed=8000, interest_rate=3.9, due_date=22)
  vehicle2 = Asset(user_id=1, asset_description='Vehicle 2', current_value=5000)
  home = Asset(user_id=1, asset_description='Primary Residence', current_value=323000, amount_owed=64000, interest_rate=3.9, due_date=12)
  rentalProperty = Asset(user_id=1, asset_description='Rental Property', current_value=215000, amount_owed=112000, interest_rate=3.9, due_date=17)

  db.session.add(vehicle1)
  db.session.add(vehicle2)
  db.session.add(home)
  db.session.add(rentalProperty)

  db.session.commit()

def undo_assets():
  db.session.execute("TRUNCATE assets RESTART IDENTITY CASCADE;")
  db.session.commit()
