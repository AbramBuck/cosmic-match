from app.models import db, Ship, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_ships():
    # demoShip = Ship(
    #     owner_id='1', name='Star Striker', fuel = 4, shields = 4, image_url="https://img.freepik.com/premium-photo/spaceship-flying-sky-with-full-moon-background-generative-ai_902338-27035.jpg?uid=R12082531&ga=GA1.1.2099741159.1700972044&semt=ais_hybrid")
    # marnieShip = Ship(
    #     owner_id='2', name='Star Drifter', fuel = 5, shields = 3, image_url="https://img.freepik.com/premium-photo/spaceship-flying-sky-with-full-moon-background-generative-ai_902338-27035.jpg?uid=R12082531&ga=GA1.1.2099741159.1700972044&semt=ais_hybrid")
    # bobbieShip = Ship(
    #     owner_id='3', name='Orbital Boater', fuel = 5, shields = 3, image_url="https://img.freepik.com/premium-photo/spaceship-flying-sky-with-full-moon-background-generative-ai_902338-27035.jpg?uid=R12082531&ga=GA1.1.2099741159.1700972044&semt=ais_hybrid")

    # db.session.add(demoShip)
    # db.session.add(marnieShip)
    # db.session.add(bobbieShip)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_ships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ships"))
        
    db.session.commit()
