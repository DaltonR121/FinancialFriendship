from app.seeds.accounts import seed_accounts
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .accounts import seed_accounts, undo_accounts
from .assets import seed_assets, undo_assets
from .credit_cards import seed_creditCards, undo_creditCards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_accounts()
    seed_assets()
    seed_creditCards()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_accounts()
    undo_assets()
    undo_creditCards()
    # Add other undo functions here
