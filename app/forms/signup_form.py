from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exist
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def isEmail(form, field):
    email = field.data
    if email.find('@') == -1 or email.find('.com') == -1:
        raise ValidationError('Has to be a valid email address')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) > 15:
        raise ValidationError('Username cannot be longer than 15 characters')

class SignUpForm(FlaskForm):
    firstName = StringField('First Name', validators=[DataRequired('First name is required')])
    lastName = StringField('Last Name', validators=[DataRequired('Last name is required')])
    username = StringField(
        'username', validators=[DataRequired('Username is required'), username_exists, username_length])
    email = StringField('email', validators=[DataRequired('Email is required'), user_exists, isEmail])
    password = StringField('password', validators=[DataRequired('Password is required')])
