import sqlite3

def get_records(query):
    with sqlite3.connect('database.db') as db:
        cursor = db.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
    return data

def insert_record(query, data):
    with sqlite3.connect('database.db') as db:
        try:
            cursor = db.cursor()
            cursor.execute(query, data)
            db.commit()
        except:
            return "", False
    return "inserted", True



'''
import sqlite3
import click
from flask import current_app, g

g is a special object that is unique for each request.
It is used to store data that might be accessed by multiple functions during the request.
The connection is stored and reused instead of creating a new connection if create_connection is called 
multiple times

current_app is another speacial function that points to the flask application handling the request

sqlite3.connect(): establishes connection

sqlite3.Row: tells connection to return rows that behave like dict. This allows accessing columns by name


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            database=current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db():
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf-8'))

@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Database connection initialized.')

# Register command
def init_app(app):
    app.teardown_appcontext(close_db)
    print('DB')
    app.cli.add_command(init_db_command)

'''