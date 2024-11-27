from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    gold = db.Column(db.Integer, default=500)
    current_ship = db.Column(db.Integer, default=1)
    mission_deck = db.Column(db.Integer, default=1)
    total_runs = db.Column(db.Integer, default=0)
    hashed_password = db.Column(db.String(255), nullable=False)

    ships = db.relationship('Ship', back_populates='owner')
    planets = db.relationship('Planet', back_populates='owner')
    card = db.relationship('Card', back_populates='owner')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'gold': self.gold,
            'current_ship': self.current_ship,
            'mission_deck': self.mission_deck,
            'total_runs': self.total_runs,
        }
