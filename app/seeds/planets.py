from app.models import db, Planet, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_planets():
    planet_one = Planet(
        owner_id='1', name='Zarros', deck_size=3, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732118724/abstract-space-bg_hltv46.jpg")
    planet_two = Planet(
        owner_id='1', name='The Expanse', deck_size=4, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732056608/speedlines_background_hqipae.jpg")
    planet_three = Planet(
        owner_id='1', name='The Dark Warp', deck_size=6, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732119360/space-bg_xuo1go.jpg")
   
    db.session.add(planet_one)
    db.session.add(planet_two)
    db.session.add(planet_three)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_planets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.planets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM planets"))
        
    db.session.commit()
