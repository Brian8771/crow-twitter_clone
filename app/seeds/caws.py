from app.models import db, Caw


def seed_caws():
    caw1 = Caw(userId=1, caw='Is this working???')
    caw2 = Caw(userId=1, caw='Testing...')
    caw3 = Caw(userId=2, caw='I love crow')
    caw4 = Caw(userId=2, caw='Is anyone there?')

    db.session.add(caw1)
    db.session.add(caw2)
    db.session.add(caw3)
    db.session.add(caw4)
    db.session.commit()

def undo_caws():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
