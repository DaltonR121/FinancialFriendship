import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Account, Asset, CreditCards, OtherObligation, MonthlyReoccurring
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.account_routes import account_routes
from .api.asset_routes import asset_routes
from .api.credit_card_routes import credit_card_routes
from .api.monthly_reoccurring_routes import monthly_reoccurring_routes
from .api.other_obligation_routes import other_obligation_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(account_routes, url_prefix='/api/accounts')
app.register_blueprint(asset_routes, url_prefix='/api/assets')
app.register_blueprint(credit_card_routes, url_prefix='/api/creditCards')
app.register_blueprint(monthly_reoccurring_routes, url_prefix='/api/monthlyReoccurring')
app.register_blueprint(other_obligation_routes, url_prefix='/api/otherObligations')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any 
# request made over http is redirected to https.
# Well.........

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
