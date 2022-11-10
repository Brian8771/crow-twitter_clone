from app.models import db, Comment
from datetime import datetime


def seed_comments():
    comment1 = Comment(userId=2, cawId=1, data='I LOVE IT!!!',
                       created_at=datetime(2022, 9, 9))
    comment2 = Comment(userId=3, cawId=1, data='Great work on it',
                       created_at=datetime(2022, 9, 9))

    comment3 = Comment(
        userId=5, cawId=2, data='Like the look of it', created_at=datetime(2022, 9, 11))
    comment4 = Comment(
        userId=6, cawId=2, data="I would have to agree", created_at=datetime(2022, 9, 11))
    comment5 = Comment(userId=4, cawId=2, data='SAME!!!',
                       created_at=datetime(2022, 9, 12))

    comment6 = Comment(userId=9, cawId=3, data="agreed",
                       created_at=datetime(2022, 9, 10))

    comment7 = Comment(userId=5, cawId=4, data='Congrats!!',
                       created_at=datetime(2022, 9, 23))
    comment8 = Comment(userId=6, cawId=4, data='Congrats!!',
                       created_at=datetime(2022, 9, 23))
    comment9 = Comment(userId=2, cawId=4, data='Congrats!!',
                       created_at=datetime(2022, 9, 23))

    comment10 = Comment(userId=4, cawId=6, data='Had fun add that in :)',
                        created_at=datetime(2022, 9, 23))
    comment11 = Comment(
        userId=3, cawId=6, data='Ya its pretty cool', created_at=datetime(2022, 9, 24))
    comment12 = Comment(userId=7, cawId=6, data='Its ok',
                        created_at=datetime(2022, 9, 23))

    comment13 = Comment(userId=4, cawId=7, data='what movie?',
                        created_at=datetime(2022, 9, 24))
    comment14 = Comment(userId=5, cawId=7, data="im jealous",
                        created_at=datetime(2022, 9, 24))
    comment15 = Comment(userId=2, cawId=7,
                        data='no invite :(', created_at=datetime(2022, 9, 25))

    comment16 = Comment(userId=2, cawId=8, data='RIGHT!!!',
                        created_at=datetime(2022, 9, 23))
    comment17 = Comment(
        userId=5, cawId=8, data='I got rained on :(', created_at=datetime(2022, 9, 23))

    comment18 = Comment(userId=3, cawId=9, data='what do u mean?',
                        created_at=datetime(2022, 10, 20))
    comment19 = Comment(
        userId=5, cawId=9, data='not too sure what u mean', created_at=datetime(2022, 10, 20))

    comment20 = Comment(userId=1, cawId=10, data='Ya its great',
                        created_at=datetime(2022, 10, 20))
    comment21 = Comment(userId=5, cawId=10, data='Very cool!!!',
                        created_at=datetime(2022, 10, 20))
    comment22 = Comment(userId=6, cawId=10, data='NICE!!!',
                        created_at=datetime(2022, 10, 20))

    comment23 = Comment(userId=4, cawId=11, data='Lets hope',
                        created_at=datetime(2022, 10, 20))
    comment24 = Comment(userId=9, cawId=11, data='bulls???',
                        created_at=datetime(2022, 10, 20))

    comment25 = Comment(
        userId=1, cawId=12, data='thats part of my job', created_at=datetime(2022, 10, 20))
    comment26 = Comment(
        userId=6, cawId=12, data='sometimes it could get tedious', created_at=datetime(2022, 10, 20))

    comment27 = Comment(userId=5, cawId=13, data='...',
                        created_at=datetime(2022, 10, 20))
    comment28 = Comment(
        userId=9, cawId=13, data='U have to be invited to mine sorry', created_at=datetime(2022, 10, 20))

    comment29 = Comment(userId=3, cawId=14, data="same",
                        created_at=datetime(2022, 10, 28))
    comment30 = Comment(
        userId=2, cawId=14, data='I have to set a restriction on it lol', created_at=datetime(2022, 10, 28))
    comment31 = Comment(
        userId=6, cawId=14, data='I cant get my homework done smh', created_at=datetime(2022, 10, 29))

    comment32 = Comment(userId=2, cawId=15, data='me neither',
                        created_at=datetime(2022, 10, 31))
    comment33 = Comment(userId=9, cawId=15, data='whats that?',
                        created_at=datetime(2022, 10, 31))

    comment34 = Comment(userId=3, cawId=16,
                        data='im sorry:(', created_at=datetime(2022, 10, 31))

    comment35 = Comment(
        userId=9, cawId=17, data='u ask at the wrong times...', created_at=datetime(2022, 10, 31))

    comment36 = Comment(userId=6, cawId=18, data='nice',
                        created_at=datetime(2022, 11, 1))
    comment37 = Comment(
        userId=5, cawId=18, data='nice ego boost for the day', created_at=datetime(2022, 11, 3))

    comment38 = Comment(userId=3, cawId=19, data='WELCOME',
                        created_at=datetime(2022, 11, 2))
    comment39 = Comment(userId=8, cawId=19, data='Hiiiii',
                        created_at=datetime(2022, 11, 2))
    comment40 = Comment(userId=3, cawId=19, data='sup',
                        created_at=datetime(2022, 11, 2))

    comment41 = Comment(userId=2, cawId=20, data='same ._.',
                        created_at=datetime(2022, 11, 2))
    comment42 = Comment(userId=6, cawId=20, data='Me?',
                        created_at=datetime(2022, 11, 2))

    comment43 = Comment(userId=1, cawId=21, data='sup',
                        created_at=datetime(2022, 11, 2))
    comment44 = Comment(userId=3, cawId=21, data='hiiii',
                        created_at=datetime(2022, 11, 2))

    comment45 = Comment(userId=5, cawId=22, data='same LOL!!!',
                        created_at=datetime(2022, 11, 3))
    comment46 = Comment(
        userId=3, cawId=22, data='they look nothing like me', created_at=datetime(2022, 11, 2))

    comment47 = Comment(userId=8, cawId=23, data='Here to help:)',
                        created_at=datetime(2022, 11, 3))
    comment48 = Comment(
        userId=7, cawId=23, data='What about us???', created_at=datetime(2022, 11, 3))

    comment49 = Comment(userId=6, cawId=24, data='thanks for making it :)',
                        created_at=datetime(2022, 11, 3))
    comment50 = Comment(
        userId=3, cawId=24, data='my favorite website', created_at=datetime(2022, 11, 3))

    comment51 = Comment(userId=4, cawId=26, data='LOL',
                        created_at=datetime(2022, 11, 3))
    comment52 = Comment(userId=2, cawId=26, data='HAHAH',
                        created_at=datetime(2022, 11, 3))

    comment53 = Comment(userId=3, cawId=27, data='smh',
                        created_at=datetime(2022, 11, 4))
    comment54 = Comment(
        userId=2, cawId=27, data='cant believe i actually laughed', created_at=datetime(2022, 11, 4))

    comment55 = Comment(userId=7, cawId=28, data='Thank you :)',
                        created_at=datetime(2022, 11, 4))
    comment56 = Comment(
        userId=8, cawId=28, data='what about us :(', created_at=datetime(2022, 11, 4))

    comment57 = Comment(userId=5, cawId=29, data='....',
                        created_at=datetime(2022, 11, 4))
    comment58 = Comment(userId=2, cawId=29, data='ME PLEASE',
                        created_at=datetime(2022, 11, 4))

    comment59 = Comment(userId=5, cawId=30, data='....',
                        created_at=datetime(2022, 11, 7))
    comment60 = Comment(userId=1, cawId=30, data='🙏🙏🙏',
                        created_at=datetime(2022, 11, 7))

    comment61 = Comment(userId=8, cawId=31, data='always here to help :)',
                        created_at=datetime(2022, 11, 7))
    comment62 = Comment(
        userId=6, cawId=31, data='ya im surprised i didnt know some of these', created_at=datetime(2022, 11, 7))

    comment63 = Comment(userId=3, cawId=32, data='LOL',
                        created_at=datetime(2022, 11, 7))
    comment64 = Comment(userId=5, cawId=32, data='HAHA',
                        created_at=datetime(2022, 11, 7))
    comment65 = Comment(userId=2, cawId=32, data='wow... 😂',
                        created_at=datetime(2022, 11, 7))

    comment66 = Comment(
        userId=2, cawId=33, data='I never went :(', created_at=datetime(2022, 11, 9))
    comment67 = Comment(userId=4, cawId=33, data='this hit home',
                        created_at=datetime(2022, 11, 9))
    comment68 = Comment(userId=6, cawId=33, data='😂😂😂',
                        created_at=datetime(2022, 11, 9))

    comment69 = Comment(userId=1, cawId=34, data='interesting',
                        created_at=datetime(2022, 11, 9))
    comment70 = Comment(
        userId=4, cawId=34, data='ive only been in the midwest so i wouldnt know :(', created_at=datetime(2022, 11, 9))
    comment71 = Comment(userId=6, cawId=34, data='woah',
                        created_at=datetime(2022, 11, 9))

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)
    db.session.add(comment35)
    db.session.add(comment36)
    db.session.add(comment37)
    db.session.add(comment38)
    db.session.add(comment39)
    db.session.add(comment40)
    db.session.add(comment41)
    db.session.add(comment42)
    db.session.add(comment43)
    db.session.add(comment44)
    db.session.add(comment45)
    db.session.add(comment46)
    db.session.add(comment47)
    db.session.add(comment48)
    db.session.add(comment49)
    db.session.add(comment50)
    db.session.add(comment51)
    db.session.add(comment52)
    db.session.add(comment53)
    db.session.add(comment54)
    db.session.add(comment55)
    db.session.add(comment56)
    db.session.add(comment57)
    db.session.add(comment58)
    db.session.add(comment59)
    db.session.add(comment60)
    db.session.add(comment61)
    db.session.add(comment62)
    db.session.add(comment63)
    db.session.add(comment64)
    db.session.add(comment65)
    db.session.add(comment66)
    db.session.add(comment67)
    db.session.add(comment68)
    db.session.add(comment69)
    db.session.add(comment70)
    db.session.add(comment71)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
