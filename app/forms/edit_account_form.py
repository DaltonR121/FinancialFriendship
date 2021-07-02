from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from app.models import Account

class EditAccountForm(FlaskForm):
    account_name = StringField('Account Name', validators=[DataRequired()])
    account_type = StringField('Account Type', validators=[DataRequired()])
    balance = DecimalField('Balance', validators=[DataRequired()])
