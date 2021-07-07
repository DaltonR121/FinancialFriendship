from app.models import db, MonthlyReoccurring

def seed_monthly_reoccurring():

  cell_phone = MonthlyReoccurring(user_id=1, account_description='Verizon', amount='140', due_date=5)
  spotify = MonthlyReoccurring(user_id=1, account_description='Spotify', amount='9.99', due_date=22)
  electric = MonthlyReoccurring(user_id=1, account_description='Electric', amount='135', due_date=30)
  water = MonthlyReoccurring(user_id=1, account_description='Water', amount='40', due_date=18)
  netflix = MonthlyReoccurring(user_id=1, account_description='Netflix', amount='17.99', due_date=20)
  hulu = MonthlyReoccurring(user_id=1, account_description='Hulu', amount='12.98', due_date=7)
  youtube_red = MonthlyReoccurring(user_id=1, account_description='YouTube Premium', amount='11.99', due_date=9)
  mortgage = MonthlyReoccurring(user_id=1, account_description='Mortgage', amount='1254.68', due_date=0)
  db.session.add(cell_phone)
  db.session.add(spotify)
  db.session.add(electric)
  db.session.add(water)
  db.session.add(netflix)
  db.session.add(hulu)
  db.session.add(youtube_red)
  db.session.add(mortgage)
  db.session.commit()

def undo_monthly_reoccurring():
  db.session.execute("TRUNCATE monthly_reoccurrings RESTART IDENTITY CASCADE;")
  db.session.commit()
