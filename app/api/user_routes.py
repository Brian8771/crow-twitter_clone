from flask import Blueprint, jsonify, flash, redirect, url_for
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.empty_form import EmptyForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/follow/<username>', methods=['POST'])
@login_required
def follow(username):

        user = User.query.filter_by(username=username).first()
        print('-------------------',current_user.to_dict())
        if user is None:
            return 'User not found.'
        if user == current_user:
            return 'You cannot follow yourself!'

        current_user.follow(user)
        db.session.commit()

        return user.to_dict()


@user_routes.route('/unfollow/<username>', methods=['POST'])
@login_required
def unfollow(username):
        user = User.query.filter_by(username=username).first()
        if user is None:

            return 'User not found'
        if user == current_user:

            return 'You cannot unfollow yourself!'
        current_user.unfollow(user)
        db.session.commit()
        # flash('You are not following {}.'.format(username))
        return user.to_dict()

# displays all users user is following
@user_routes.route('/<int:id>/following')
def get_followings(id):
    user = User.query.get(id)

    followings = list(user.followed)
    res = []
    for user in followings:
        user_dict = user.to_dict()
        res.append(user_dict)

    return {'following': res}

# displays all users follwing user
@user_routes.route('/<int:id>/followers')
def get_followers(id):
    user = User.query.get(id)

    followers = list(user.followers)
    res = []
    for user in followers:
        user_dict = user.to_dict()
        res.append(user_dict)

    return {'followers': res}
