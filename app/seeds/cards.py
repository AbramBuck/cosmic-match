from app.models import db, Planet, Card, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cards():
    card_one = Card(
        owner_id='1',
        name='Female Alien', 
        description='enemy', 
        hostile=True,
        reward=30,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732305611/alien_female_blue_twozql.jpg",
        )
    
    card_two = Card(
        owner_id='1',
        name='Snake',  
        description='snake',
        hostile=False, 
        reward=15,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732305617/snake_h396qr.jpg",
        )
    
    card_three = Card(
        owner_id='1',
        name='Desolation', 
        description='enemy', 
        hostile=True,
        reward=30,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732314910/plains-of-desolation_cm1b8r.jpg",
        )
    
    card_four = Card(
        owner_id='1',
        name='Ship',  
        description='ship',
        hostile=False, 
        reward=15,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732209186/sky_javelin_gtbevf.jpg",
        )
    
    card_five = Card(
        owner_id='1',
        name='Alien Group', 
        description='enemy', 
        hostile=True,
        reward=30,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732551243/alien_enemy_group_ivn8er.jpg",
        )
    
    card_six = Card(
        owner_id='1',
        name='Spectral Cactus',  
        description='Cacti',
        hostile=False, 
        reward=15,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732551246/cactus_zjslv4.jpg",
        )
    
    card_seven = Card(
        owner_id='1',
        name='Desolation', 
        description='enemy', 
        hostile=True,
        reward=30,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732314910/plains-of-desolation_cm1b8r.jpg",
        )
    
    card_eight = Card(
        owner_id='1',
        name='Ship',  
        description='ship',
        hostile=False, 
        reward=15,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732209186/sky_javelin_gtbevf.jpg",
        )
    
    card_nine = Card(
        owner_id='1',
        name='Alien Group', 
        description='enemy', 
        hostile=True,
        reward=30,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732551243/alien_enemy_group_ivn8er.jpg",
        )
    
    card_ten = Card(
        owner_id='1',
        name='Spectral Cactus',  
        description='Cacti',
        hostile=False, 
        reward=15,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1732551246/cactus_zjslv4.jpg",
        )

    db.session.add(card_one)
    db.session.add(card_two)
    db.session.add(card_three)
    db.session.add(card_four)
    db.session.add(card_five)
    db.session.add(card_six)
    db.session.add(card_seven)
    db.session.add(card_eight)
    db.session.add(card_nine)
    db.session.add(card_ten)
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
