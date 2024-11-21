from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_images():
    image_one = Image(
        owner_id='1', name='Star Whale Image', url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732147953/cargo_whale_ship_lmuc4g.jpg")
    image_two = Image(
        owner_id='1', name='Star Striker Image', url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732147953/cargo_whale_ship_lmuc4g.jpg")
    db.session.add(image_one)
    db.session.add(image_two)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        
    db.session.commit()