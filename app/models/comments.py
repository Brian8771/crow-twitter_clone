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
