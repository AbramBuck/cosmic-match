from flask.cli import AppGroup
from .users import seed_users, undo_users
from .ships import seed_ships, undo_ships
from .planets import seed_planets, undo_planets
from .cards import seed_cards, undo_cards
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_ships()
        undo_planets()
        undo_cards()        
    seed_users()
    seed_ships()
    seed_planets()
    seed_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_ships()
    undo_planets()
    undo_cards()
    # Add other undo functions here
