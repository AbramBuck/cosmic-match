from app.models import db, Planet, Card, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cards():
    skyw_one_d = Card(
        owner_id='1',
        name='Big-Beak',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110025/big-beak_htzygv.jpg",
        )
    
    skyw_two_d = Card(
        owner_id='1',
        name='Pink Passion Parrot',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110123/pink-passion_ejgud7.jpg",
        )
    
    skyw_three_d = Card(
        owner_id='1',
        name='Death Mouth',  
        description='None',
        hostile=True, 
        reward=60,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110221/death-mouth_nhk4gq.jpg",
        )
    
    skyw_four_d = Card(
        owner_id='1',
        name='Night Owls',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110311/owls_xwd6m4.jpg",
        )
    
    skyw_five_d = Card(
        owner_id='1',
        name='Parrot Prime',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110467/parrot-prime_u738ty.jpg",
        )
    
    skyw_five_d = Card(
        owner_id='1',
        name='Cloud Plains',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733112026/skyplains_rbosrk.jpg",
        )
    
    skyw_six_d = Card(
        owner_id='1',
        name='Terrorsaur',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='2',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733112111/terrorsaur_wttxfe.jpg",
        )
    
    sag_one_d = Card(
        owner_id='1',
        name='Azul Alien',  
        description='None',
        hostile=True, 
        reward=40,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113359/alien_enemy_weyosi.jpg",
        )
    
    sag_two_d = Card(
        owner_id='1',
        name='Crimson Alien',  
        description='None',
        hostile=True, 
        reward=40,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113411/alien_green_enemy_plv5gn.jpg",
        )
    
    sag_three_d = Card(
        owner_id='1',
        name='Cosmic Blossom',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113448/cosmic-blossom_qvo81p.jpg",
        )
    
    sag_four_d = Card(
        owner_id='1',
        name='Majestic Forrest',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='1',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113519/majestic_forest_isbq0f.jpg",
        )
    
    hy_one_d = Card(
        owner_id='1',
        name='Alien Patrol',  
        description='None',
        hostile=True, 
        reward=120,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115552/alien_enemy_group_tdq8ab.jpg",
        )
    
    hy_two_d = Card(
        owner_id='1',
        name='Female Grey',  
        description='None',
        hostile=True, 
        reward=120,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115614/female-grey_gfxxzk.jpg",
        )

    hy_three_d = Card(
        owner_id='1',
        name='Spawning Grounds',  
        description='None',
        hostile=False, 
        reward=60,
        matched=False,
        planet_id='3',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115657/alien-breeding-world_jwunc4.jpg",
        )
    
    skyw_one = Card(
        owner_id='3',
        name='Big-Beak',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110025/big-beak_htzygv.jpg",
        )
    
    skyw_two = Card(
        owner_id='3',
        name='Pink Passion Parrot',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110123/pink-passion_ejgud7.jpg",
        )
    
    skyw_three = Card(
        owner_id='3',
        name='Death Mouth',  
        description='None',
        hostile=True, 
        reward=60,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110221/death-mouth_nhk4gq.jpg",
        )
    
    skyw_four = Card(
        owner_id='3',
        name='Night Owls',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110311/owls_xwd6m4.jpg",
        )
    
    skyw_five = Card(
        owner_id='3',
        name='Parrot Prime',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733110467/parrot-prime_u738ty.jpg",
        )
    
    skyw_five = Card(
        owner_id='3',
        name='Cloud Plains',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733112026/skyplains_rbosrk.jpg",
        )
    
    skyw_six = Card(
        owner_id='3',
        name='Terrorsaur',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='5',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733112111/terrorsaur_wttxfe.jpg",
        )
    
    sag_one = Card(
        owner_id='3',
        name='Azul Alien',  
        description='None',
        hostile=True, 
        reward=40,
        matched=False,
        planet_id='4',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113359/alien_enemy_weyosi.jpg",
        )
    
    sag_two = Card(
        owner_id='3',
        name='Crimson Alien',  
        description='None',
        hostile=True, 
        reward=40,
        matched=False,
        planet_id='4',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113411/alien_green_enemy_plv5gn.jpg",
        )
    
    sag_three = Card(
        owner_id='3',
        name='Cosmic Blossom',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='4',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113448/cosmic-blossom_qvo81p.jpg",
        )
    
    sag_four = Card(
        owner_id='3',
        name='Majestic Forrest',  
        description='None',
        hostile=False, 
        reward=20,
        matched=False,
        planet_id='4',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733113519/majestic_forest_isbq0f.jpg",
        )
    
    hy_one = Card(
        owner_id='3',
        name='Alien Patrol',  
        description='None',
        hostile=True, 
        reward=120,
        matched=False,
        planet_id='6',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115552/alien_enemy_group_tdq8ab.jpg",
        )
    
    hy_two = Card(
        owner_id='3',
        name='Female Grey',  
        description='None',
        hostile=True, 
        reward=120,
        matched=False,
        planet_id='6',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115614/female-grey_gfxxzk.jpg",
        )

    hy_three = Card(
        owner_id='3',
        name='Spawning Grounds',  
        description='None',
        hostile=False, 
        reward=60,
        matched=False,
        planet_id='6',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733115657/alien-breeding-world_jwunc4.jpg",
        )
    
    credits = Card(
        owner_id='3',
        name='Credits',  
        description='None',
        hostile=False, 
        reward=1000,
        matched=False,
        planet_id='7',
        base_game=True,
        image_url="https://res.cloudinary.com/di0fa12vz/image/upload/v1733116088/credit-card_x3osg4.jpg",
        )

    db.session.add(skyw_one_d)
    db.session.add(skyw_two_d)
    db.session.add(skyw_three_d)
    db.session.add(skyw_four_d)
    db.session.add(skyw_five_d)
    db.session.add(skyw_six_d)
    db.session.add(sag_one_d)
    db.session.add(sag_two_d)
    db.session.add(sag_three_d)
    db.session.add(sag_four_d)
    db.session.add(hy_one_d)
    db.session.add(hy_two_d)
    db.session.add(hy_three_d)
    db.session.add(skyw_one)
    db.session.add(skyw_two)
    db.session.add(skyw_three)
    db.session.add(skyw_four)
    db.session.add(skyw_five)
    db.session.add(skyw_six)
    db.session.add(sag_one)
    db.session.add(sag_two)
    db.session.add(sag_three)
    db.session.add(sag_four)
    db.session.add(hy_one)
    db.session.add(hy_two)
    db.session.add(hy_three)
    db.session.add(credits)
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
