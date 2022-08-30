from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Caw


class CreateCawForm(FlaskForm):
    # userId = IntegerField('userId', validators=[DataRequired()])
    caw = StringField('Caw', validators=[DataRequired()])
