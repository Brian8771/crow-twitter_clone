from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',first_name='Demo',last_name='User', email='demo@aa.io', password='password', profile_image='https://cdn-icons-png.flaticon.com/512/3135/3135715.png', header_image='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Purple_website.svg/640px-Purple_website.svg.png')
    marnie = User(
        username='marnie',first_name='Marnie',last_name='User', email='marnie@aa.io', password='password1')
    bobbie = User(
        username='bobbie',first_name='Bobbie',last_name='User', email='bobbie@aa.io', password='password2')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
