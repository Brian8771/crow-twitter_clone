from .db import db, environment, SCHEMA, add_prefix_for_prod

caw_likes = db.Table(
    "caw_likes",
    db.Column("cawId", db.Integer, db.ForeignKey(add_prefix_for_prod(
        "caws.id"), ondelete="CASCADE"), primary_key=True),
    db.Column("userId", db.Integer, db.ForeignKey(add_prefix_for_prod(
        "users.id"), ondelete="CASCADE"), primary_key=True)
)

if environment == "production":
    caw_likes.schema = SCHEMA


class Caw(db.Model):
    __tablename__ = 'caws'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'users.id'), ondelete='CASCADE'), nullable=False)
    caw = db.Column(db.String(180), nullable=False)
    image = db.Column(db.String(180))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=db.func.now())

    user = db.relationship("User", back_populates="caws")

    comments = db.relationship(
        'Comment', back_populates='caw', cascade='all, delete')

    caw_like_users = db.relationship(
        "User",
        secondary=caw_likes,
        back_populates='like_caws',
        passive_deletes=True
    )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'caw': self.caw,
            'image': self.image,
            'createdAt': self.created_at,
            "user": {
                "firstName": self.user.first_name,
                "profileImage": self.user.profile_image,
                "username": self.user.username,
                'totalCaws': len(self.user.caws),
                'id': self.user.id
            },
            'totalComments': len(self.comments),
            'totalLikes': len(self.caw_like_users)
        }
