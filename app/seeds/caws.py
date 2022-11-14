from app.models import db, Caw
from datetime import datetime


def seed_caws():

    brian4 = Caw(userId=4, caw='I created this site :)',
                 created_at=datetime(2022, 9, 9))
    demo4 = Caw(userId=1, caw='I love the feel of this site',
                created_at=datetime(2022, 9, 10))
    eric3 = Caw(userId=6, caw='This my first time on here I love it!!!',
                created_at=datetime(2022, 9, 10))
    brian5 = Caw(userId=4, caw='I graduated!!!',
                 created_at=datetime(2022, 9, 23))
    maddie1 = Caw(userId=9, caw="Hanging with this girl",
                  created_at=datetime(2022, 9, 23))
    eric1 = Caw(userId=6, caw='I love that you can comment on caws',
                created_at=datetime(2022, 9, 23))
    demo5 = Caw(userId=1, caw='Had a great time with maddie at the movies!!!',
                created_at=datetime(2022, 9, 23))
    bobbie2 = Caw(userId=3, caw='Why does it have to rain today smh',
                  created_at=datetime(2022, 9, 23))
    demo2 = Caw(userId=1, caw='Is this working???',
                image='https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg', created_at=datetime(2022, 10, 20))
    brian1 = Caw(userId=4, caw='I love app academy',
                 created_at=datetime(2022, 10, 20))
    bobbie1 = Caw(userId=3, caw='Bulls better win this year',
                  created_at=datetime(2022, 10, 20))
    robert1 = Caw(userId=5, caw='I love testing things',
                  created_at=datetime(2022, 10, 20))
    marnie3 = Caw(userId=2, caw='Where the parties at???',
                  created_at=datetime(2022, 10, 20))
    demo1 = Caw(userId=1, caw='I love going on Crow',
                created_at=datetime(2022, 10, 28))
    bobbie3 = Caw(userId=3, caw='I cannot imagine life without sports',
                  created_at=datetime(2022, 10, 31))
    demo3 = Caw(userId=1, caw="I can't believe bobbie went out with eric without me",
                created_at=datetime(2022, 10, 31))
    marnie1 = Caw(userId=2, caw='Why does no one ever want to hang :(',
                  created_at=datetime(2022, 10, 31))
    caw10 = Caw(userId=8, caw='Crows and ravens are some of the smartest animals in the world, with their intelligence considered on par with chimpanzees.',
                created_at=datetime(2022, 11, 1))
    crowPuns2 = Caw(userId=7, caw='This my first day out here',
                    created_at=datetime(2022, 11, 2))
    demo7 = Caw(userId=1, caw='I think eric hates me ...',
                created_at=datetime(2022, 11, 2))
    eric2 = Caw(userId=6, caw='Sup', created_at=datetime(2022, 11, 2))
    caw13 = Caw(userId=8, caw='American Crows are easy to confuse with Fish Crows, as well as their other close relative, the Common Raven.',
                created_at=datetime(2022, 11, 3))
    marnie2 = Caw(userId=2, caw='CrowFacts is helping me learn more about myself',
                  created_at=datetime(2022, 11, 3))
    brian2 = Caw(userId=4, caw='This was fun to make',
                 created_at=datetime(2022, 11, 3))
    robert2 = Caw(userId=5, caw='Is anyone there?',
                  created_at=datetime(2022, 11, 3))
    crowPuns5 = Caw(userId=7, caw='''I heard some crows communicating after one of their own was injured.
    They were caws for concern.''', created_at=datetime(2022, 11, 3))
    crowPuns3 = Caw(userId=7, caw='''What kind of crows always stick together...
    Vel-crow!''', created_at=datetime(2022, 11, 4))
    demo6 = Caw(userId=1, caw='My favorite account has to be crowPuns LOL',
                created_at=datetime(2022, 11, 4))
    brian3 = Caw(userId=4, caw='Does anyone want to be friends?',
                 created_at=datetime(2022, 11, 4))
    caw20 = Caw(userId=8, caw='Recent research has also shown that crows are also known to hold “funerals" and "wakes."',
                created_at=datetime(2022, 11, 7))
    marnie4 = Caw(userId=2, caw='CrowFacts is helping me learn more about myself',
                  created_at=datetime(2022, 11, 7))
    crowPuns4 = Caw(userId=7, caw='''What do you call a white crow?
    A caw-casian.''', created_at=datetime(2022, 11, 7))
    crowPuns1 = Caw(userId=7, caw='''Where do crows go to get educated?
    CAWlege''', created_at=datetime(2022, 11, 9))
    crowFacts1 = Caw(userId=8, caw='Crows have regional dialects.',
                     created_at=datetime(2022, 11, 9))

    db.session.add(brian4)
    db.session.add(demo4)
    db.session.add(eric3)
    db.session.add(brian5)
    db.session.add(maddie1)
    db.session.add(eric1)
    db.session.add(demo5)
    db.session.add(bobbie2)
    db.session.add(demo2)
    db.session.add(brian1)
    db.session.add(bobbie1)
    db.session.add(robert1)
    db.session.add(marnie3)
    db.session.add(demo1)
    db.session.add(bobbie3)
    db.session.add(demo3)
    db.session.add(marnie1)
    db.session.add(caw10)
    db.session.add(crowPuns2)
    db.session.add(demo7)
    db.session.add(eric2)
    db.session.add(caw13)
    db.session.add(marnie2)
    db.session.add(brian2)
    db.session.add(robert2)
    db.session.add(crowPuns5)
    db.session.add(crowPuns3)
    db.session.add(demo6)
    db.session.add(brian3)
    db.session.add(caw20)
    db.session.add(marnie4)
    db.session.add(crowPuns4)
    db.session.add(crowPuns1)
    db.session.add(crowFacts1)

    db.session.commit()


def undo_caws():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
