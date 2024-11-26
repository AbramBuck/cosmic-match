from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import UserMixin


class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('planets.id')), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String(255))
    description = db.Column(db.String(255))
    hostile = db.Column(db.Boolean, default=False, nullable=False )
    reward = db.Column(db.Integer, default=15, nullable=False )
    base_game = db.Column(db.Boolean, default=False, nullable=False )
    matched = db.Column(db.Boolean, default=False, nullable=False )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship('User', back_populates='card')
    planet = db.relationship('Planet', back_populates='cards')

    def __repr__(self):
        return f"<Card(id={self.id}, title={self.title})>"

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'planet_id': self.planet_id,
            'name': self.name,
            'image_url': self.image_url,
            'description': self.description,
            'hostile': self.hostile,
            'reward': self.reward,
            'matched': self.matched,
            'base_game': self.base_game,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
