from .db import db


class Caw(db.Model):
    __tablename__ = 'caws'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    caw = db.Column(db.String(180), nullable=False)

    user = db.relationship("User", back_populates="caws")

    comments = db.relationship('Comment', back_populates='caw', cascade='all, delete')
