from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import UserMixin

class Ship(db.Model, UserMixin):
    __tablename__ = 'ships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    fuel = db.Column(db.Integer, nullable=False)
    shields = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    runs_completed = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship('User', back_populates='ships')

    def __repr__(self):
        return f"<Ship(id={self.id}, owner_id={self.owner_id}, name={self.name}, fuel={self.fuel}, shields={self.shields}, runs_completed={self.runs_completed}, image_url={self.image_url})>"

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'fuel': self.fuel,
            'shields': self.shields,
            'runs_completed': self.runs_completed,
            'image_url': self.image_url,
        }