from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .caws import caw_likes
from .comments import comment_likes


followers = db.Table('followers',
                     db.Column('follower_id', db.Integer,
                               db.ForeignKey(add_prefix_for_prod('users.id'))),
                     db.Column('followed_id', db.Integer,
                               db.ForeignKey(add_prefix_for_prod('users.id')))
                     )
if environment == "production":
    followers.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(
        255), default='https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png')
    header_image = db.Column(db.String, default='data:image/jpeg;base64,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')
    bio = db.Column(db.String(255))

    caws = db.relationship("Caw", back_populates="user", cascade="all, delete")

    comments = db.relationship(
        'Comment', back_populates='user', cascade='all, delete')

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
            'like_caws': [caw.to_dict() for caw in self.like_caws],
            'profileImage': self.profile_image,
            'headerImage': self.header_image,
            'bio': self.bio,
            'followingCount': self.followed.count(),
            'followerCount': self.followers.count(),
            'followers': [followers.to_dict() for followers in self.followers],
        }
