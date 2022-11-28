from .db import db, environment, SCHEMA, add_prefix_for_prod

comment_likes = db.Table(
    "comment_likes",
    db.Column("commentId", db.Integer, db.ForeignKey(add_prefix_for_prod(
        "comments.id", ondelete="CASCADE")), primary_key=True),
    db.Column("userId", db.Integer, db.ForeignKey(add_prefix_for_prod(
        "users.id", ondelete="CASCADE")), primary_key=True)
)
if environment == "production":
    comment_likes.schema = SCHEMA


class Comment(db.Model):
    __tablename__ = "comments"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        "users.id", ondelete="CASCADE")), nullable=False)
    cawId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        "caws.id", ondelete="CASCADE")), nullable=False)
    data = db.Column(db.String(500))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    caw = db.relationship("Caw", back_populates="comments")

    comment_like_users = db.relationship(
        "User",
        secondary=comment_likes,
        back_populates="like_comments",
        passive_deletes=True
    )

    def to_dict(self):
        return {
            'id': self.id,
            'data': self.data,
            'createdAt': self.created_at,
            'userid': self.userId,
            'cawId': self.cawId,
            'createdAt': self.created_at,
            'user': {
                "firstName": self.user.first_name,
                'id': self.user.id,
                "profileImage": self.user.profile_image,
                "username": self.user.username,
                'totalCaws': len(self.user.caws),
            },
            'caw': {
                'id': self.caw.id,
                'cawUserId': self.caw.user.id,
                'username': self.caw.user.username
            },
            'totalLikes': len(self.comment_like_users)

        }
