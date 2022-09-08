from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo1234',first_name='Demo',last_name='User', email='demo@aa.io', password='password', profile_image='https://cdn-icons-png.flaticon.com/512/3135/3135715.png', header_image='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Purple_website.svg/640px-Purple_website.svg.png', bio='Im just a demo user :)')
    marnie = User(
        username='Marnie23',first_name='Marnie',last_name='User', email='marnie@aa.io', password='password1', profile_image='https://cdn-icons-png.flaticon.com/128/2920/2920072.png', bio='Hi im marnie :)')
    bobbie = User(
        username='BobbieThatDudes',first_name='Bobbie',last_name='User', email='bobbie@aa.io', password='password2', profile_image='https://cdn-icons-png.flaticon.com/128/3011/3011270.png', bio='I love to play 🏀 and 🏈')
    brian = User(
        username='Brian8771',first_name='Brian',last_name='Aguilar', email='brian8771@aa.io', password='password3', profile_image='https://cdn-icons-png.flaticon.com/128/236/236831.png', bio='Hi I am brian and I created this site')
    test = User(
        username='TestUser123',first_name='Test',last_name='Again', email='testing@aa.io', password='password4', profile_image='https://cdn-icons-png.flaticon.com/128/2919/2919906.png', bio='Just a test user testing stuff')
    eric = User(
        username='Eric23',first_name='Eric',last_name='Hernandez', email='eric@aa.io', password='password5', profile_image='https://cdn-icons-png.flaticon.com/128/219/219970.png', bio="I'm on this site 24/7")
    rebecca = User(
        username='Rebecca2256',first_name='Rebecca',last_name='Smith', email='rebecca@aa.io', password='password6', profile_image='https://cdn-icons-png.flaticon.com/128/3135/3135823.png', bio='I am new to this site')
    hank = User(
        username='Hank_Propane',first_name='Hank',last_name='Hill', email='hank@aa.io', password='password7', profile_image='https://cdn-icons-png.flaticon.com/128/206/206853.png', bio='Propane > Charcoal')
    maddie = User(
        username='Maddie_28',first_name='Maddie',last_name='Cichocki', email='maddie@aa.io', password='password8', profile_image='https://cdn-icons-png.flaticon.com/128/8398/8398242.png', bio="I'm a nice fun girl")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brian)
    db.session.add(test)
    db.session.add(eric)
    db.session.add(rebecca)
    db.session.add(hank)
    db.session.add(maddie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
