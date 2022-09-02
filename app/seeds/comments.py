from app.models import db, Comment


def seed_comments():
    comment1 = Comment(userId=2, cawId=1, data='tests')
    comment2 = Comment(userId=3, cawId=1, data='tests')
    comment3 = Comment(userId=1, cawId=2, data='tests')
    comment4 = Comment(userId=3, cawId=2, data='tests')
    comment5 = Comment(userId=1, cawId=3, data='tests')
    comment6 = Comment(userId=2, cawId=3, data='tests')
    comment7 = Comment(userId=2, cawId=4, data='tests')
    comment8 = Comment(userId=3, cawId=4, data='tests')
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
