
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .caws import caw_likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), default='https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png')
    header_image = db.Column(db.String(255), default='https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png')
    bio = db.Column(db.String(255))

    caws = db.relationship("Caw", back_populates="user", cascade="all, delete")

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    like_caws = db.relationship(
        "Caw",
        secondary=caw_likes,
        back_populates='caw_like_users',
        cascade='all, delete'
    )

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
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profileImage': self.profile_image,
            'headerImage': self.header_image,
            'bio': self.bio
        }
