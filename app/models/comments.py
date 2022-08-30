from .db import db


class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  cawId = db.Column(db.Integer, db.ForeignKey("caws.id", ondelete="CASCADE"), nullable=False)
  data = db.Column(db.String(500))
  created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

  user = db.relationship("User", back_populates="comments")
  caw = db.relationship("Caw", back_populates="comments")


  def to_dict(self):
    return {
    'id': self.id,
    'data': self.data,
    'createdAt': self.created_at,
    'userid': self.userId,
    'cawId': self.cawId,
    'user': {
        'id': self.user.id,
        "profileImage":self.user.profile_image,
        "username":self.user.username,
        'totalCaws': len(self.user.caws),
      },
    'caw': {
        'id': self.caw.id,
        'cawUserId': self.caw.user.id,
        'username': self.caw.user.username
      }
    }
