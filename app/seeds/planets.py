from app.models import db, Planet, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_planets():
    planet_one = Planet(
        owner_id='1', name='Sagittarius-A', deck_size=4, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113053/sagittarius-planet_mbzsja.jpg")
    planet_two = Planet(
        owner_id='1', name='Sky World', deck_size=6, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733109860/sky-world_cbcerg.jpg")
    planet_three = Planet(
        owner_id='1', name='Hybrid Colony', deck_size=3, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115481/city_sx37bb.jpg")
    planet_four = Planet(
        owner_id='3', name='Sagittarius-A', deck_size=4, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113053/sagittarius-planet_mbzsja.jpg")
    planet_five = Planet(
        owner_id='3', name='Sky World', deck_size=6, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733109860/sky-world_cbcerg.jpg")
    planet_six = Planet(
        owner_id='3', name='Hybrid Colony', deck_size=3, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115481/city_sx37bb.jpg")
    planet_seven = Planet(
        owner_id='3', name='Credit World', deck_size=1, image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733116020/credit-world_vjzjoj.jpg")
    db.session.add(planet_one)
    db.session.add(planet_two)
    db.session.add(planet_three)
    db.session.add(planet_four)
    db.session.add(planet_five)
    db.session.add(planet_six)
    db.session.add(planet_seven)
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
