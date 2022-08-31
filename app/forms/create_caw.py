from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Caw

def check_length(form, field):
    caw = field.data

    if len(caw) > 180:
        raise ValidationError("Can't be longer than 180 characters")

class CreateCawForm(FlaskForm):
    # userId = IntegerField('userId', validators=[DataRequired()])
    caw = StringField('Caw', validators=[DataRequired(), check_length])
