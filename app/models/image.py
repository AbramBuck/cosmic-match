from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=True, nullable=False)


    def __repr__(self):
        return f"<Image(id={self.id}, name={self.name}, url={self.url})>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url,
        }