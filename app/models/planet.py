from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_login import UserMixin

class Planet(db.Model, UserMixin):
    __tablename__ = 'planets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    deck_size = db.Column(db.Integer, default=6) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
  
    owner = db.relationship('User', back_populates='planets')
    cards = db.relationship('Card', back_populates='planet')
