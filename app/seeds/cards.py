from app.models import db, Planet, Card, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cards():
    card_one = Card(
        owner_id='1', name='Female Alien',  description='enemy',  hostile=True,  reward=30, planet_id='1', base_game=True, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732305611/alien_female_blue_twozql.jpg")
    card_two = Card(
        owner_id='1', name='Snake',   description='snake', hostile=False,  reward=15, planet_id='1', base_game=True, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732305617/snake_h396qr.jpg")
   
    db.session.add(card_one)
    db.session.add(card_two)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
        
    db.session.commit()
