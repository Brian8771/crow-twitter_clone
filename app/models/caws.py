from .db import db


class Caw(db.Model):
    __tablename__ = 'caws'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    caw = db.Column(db.String(180), nullable=False)

    user = db.relationship("User", back_populates="caws")

    comments = db.relationship('Comment', back_populates='caw', cascade='all, delete')

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
        'totalComments': len(self.comments)
        }
