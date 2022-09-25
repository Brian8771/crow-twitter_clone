from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .caws import caw_likes
from .comments import comment_likes



followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)


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

    like_comments = db.relationship(
        "Comment",
        secondary=comment_likes,
        back_populates="comment_like_users",
        cascade="all, delete"
    )

    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def follow(self, users):
        if not self.is_following(users):
            self.followed.append(users)

    def unfollow(self, users):
        if self.is_following(users):
            self.followed.remove(users)

    def is_following(self, users):
        return self.followed.filter(
            followers.c.followed_id == users.id).count() > 0

    # def followed_posts(self):
    #     return Post.query.join(
    #         followers, (followers.c.followed_id == Post.user_id)).filter(
    #             followers.c.follower_id == self.id).order_by(
    #                 Post.timestamp.desc())

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profileImage': self.profile_image,
            'headerImage': self.header_image,
            'bio': self.bio,
            'followingCount': self.followed.count(),
            'followerCount': self.followers.count(),
            'followers': [followers.to_dict() for followers in self.followers],
        }
