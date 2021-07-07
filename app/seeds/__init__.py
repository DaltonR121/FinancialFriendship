from app.seeds.accounts import seed_accounts
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .accounts import seed_accounts, undo_accounts
from .assets import seed_assets, undo_assets
from .credit_cards import seed_creditCards, undo_creditCards
from .monthly_reoccurring import seed_monthly_reoccurring, undo_monthly_reoccurring
from .other_obligations import seed_other_obligations, undo_other_obligations

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
    seed_monthly_reoccurring()
    seed_other_obligations()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_accounts()
    undo_assets()
    undo_creditCards()
    undo_monthly_reoccurring()
    undo_other_obligations()
    # Add other undo functions here
