from .db import db
from datetime import datetime
from flask_login import UserMixin

class Planet(db.Model, UserMixin):
    __tablename__ = 'planets'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    deck_size = db.Column(db.Integer, default=6) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
  
    owner = db.relationship('User', back_populates='planets')
