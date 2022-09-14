from .db import db

caw_likes = db.Table(
  "caw_likes",
  db.Column("cawId", db.Integer, db.ForeignKey("caws.id", ondelete="CASCADE"), primary_key=True),
  db.Column("userId", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
)


class Caw(db.Model):
    __tablename__ = 'caws'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    caw = db.Column(db.String(180), nullable=False)

    user = db.relationship("User", back_populates="caws")

    comments = db.relationship('Comment', back_populates='caw', cascade='all, delete')

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
        "user": {
          "profileImage":self.user.profile_image,
          "username":self.user.username,
          'totalCaws': len(self.user.caws),
          'id':self.user.id
        },
        'totalComments': len(self.comments),
        'totalLikes': len(self.caw_like_users)
        }
