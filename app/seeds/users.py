from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    marnie = User(
        username='Marnie23', first_name='Marnie', last_name='User', email='marnie@aa.io', password='password1', profile_image='https://www.allaboutbirds.org/guide/assets/photo/59858031-480px.jpg', bio='Hi im marnie :)')
    bobbie = User(
        username='BobbieThatDudes', first_name='Bobbie', last_name='User', email='bobbie@aa.io', password='password2', profile_image='https://bloximages.newyork1.vip.townnews.com/swnewsmedia.com/content/tncms/assets/v3/editorial/2/21/221ce13b-536c-515c-869f-d0aa2ddc2162/5dd5522576b09.image.jpg', bio='I love to play 🏀 and 🏈')
    brian = User(
        username='Brian8771', first_name='Brian', last_name='Aguilar', email='brian8771@aa.io', password='password3', profile_image='https://inaturalist-open-data.s3.amazonaws.com/photos/59311016/original.jpg', bio='Hi I am brian and I created this site')
    robert = User(
        username='Rob_The_Man', first_name='Robert', last_name='Mann', email='testing@aa.io', password='password4', profile_image='https://cdn.pixabay.com/photo/2022/10/07/09/27/crow-7504637__480.jpg', bio='Like to chill with my homies on the weekends')
    eric = User(
        username='Eric23', first_name='Eric', last_name='Hernandez', email='eric@aa.io', password='password5', profile_image='https://cdn.pixabay.com/photo/2022/10/11/07/23/crow-7513601__480.jpg', bio="I'm on this site 24/7")
    crowPuns = User(
        username='CrowPuns', first_name='Puns', last_name='Crow', email='crowPuns@aa.io', password='password6', profile_image='https://cdn.pixabay.com/photo/2018/04/24/18/34/crow-3347677_1280.jpg', bio='I post crow puns')
    crow = User(
        username='CrowFacts', first_name='Crow', last_name='Facts', email='crow@aa.io', password='password7', profile_image='https://cdn.pixabay.com/photo/2019/02/23/19/50/raven-4016367_1280.jpg', bio='I post crow facts')
    maddie = User(
        username='Maddie_28', first_name='Maddie', last_name='Cichocki', email='maddie@aa.io', password='password8', profile_image='https://cdn.pixabay.com/photo/2019/07/03/15/42/crow-4314822_1280.jpg', bio="I'm a nice fun girl")
    demo = User(
        username='Demo1234', first_name='Demo', last_name='User', email='demo@aa.io', password='password', profile_image='https://cdn.mos.cms.futurecdn.net/PqHzRT5FnGPSoEUMfmGSWH.jpg', bio='Im just a demo user :)')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brian)
    db.session.add(robert)
    db.session.add(eric)
    db.session.add(crowPuns)
    db.session.add(crow)
    db.session.add(maddie)
    # demo.followed = [marnie, bobbie, brian,
    #                  robert, eric, crowPuns, maddie, crow]
    # brian.followed = [maddie, rebecca, eric, crow];
    # maddie.followed = [brian, eric, demo];
    # bobbie.followed = [crow, rebecca];
    # marnie.followed = [demo];
    # eric.followed = [brian, maddie, demo];

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
