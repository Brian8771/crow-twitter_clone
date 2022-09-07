from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class CreateComment(FlaskForm):
    comment = StringField('data', validators=[DataRequired('Comment can not be empty')])
