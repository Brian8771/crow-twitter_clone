from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo1234',first_name='Demo',last_name='User', email='demo@aa.io', password='password', profile_image='https://cdn-icons-png.flaticon.com/512/3135/3135715.png', header_image='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Purple_website.svg/640px-Purple_website.svg.png', bio='Im just a demo user :)')
    marnie = User(
        username='Marnie23',first_name='Marnie',last_name='User', email='marnie@aa.io', password='password1')
    bobbie = User(
        username='BobbieThatDudes',first_name='Bobbie',last_name='User', email='bobbie@aa.io', password='password2')
    brian = User(
        username='Brian8771',first_name='Brian',last_name='Aguilar', email='brian8771@aa.io', password='password3')
    test = User(
        username='TestUser123',first_name='Test',last_name='Again', email='testing@aa.io', password='password4')
    eric = User(
        username='Eric23',first_name='Eric',last_name='Hernandez', email='eric@aa.io', password='password5')
    rebecca = User(
        username='Rebecca2256',first_name='Rebecca',last_name='Smith', email='rebecca@aa.io', password='password6')
    hank = User(
        username='Hank_Propane',first_name='Hank',last_name='Hill', email='hank@aa.io', password='password7')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brian)
    db.session.add(test)
    db.session.add(eric)
    db.session.add(rebecca)
    db.session.add(hank)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
