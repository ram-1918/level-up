from flask import Flask, request
import sqlite3
from .db import get_records, insert_record

app = Flask(__name__)

cursor = sqlite3.connect('database.db')
cursor.execute(
    ''' CREATE TABLE IF NOT EXISTS STREAK ( count INT, date TEXT ) '''
    )

@app.route('/api/streak/1')
def StreakAPI1():
    '''
    Case 1: Today's streak record already exist
        Do not update streak count
    Case 2: Yesterdays' streak record exists
        Use yesterday's streak count
    Case 3: If todays or yesterdays records do not exist
        Create a new record with streak count of 0
    '''
    print(request)
    query = ''' INSERT INTO STREAK (count, date) VALUES (?, ?) '''
    result, status = insert_record(query, (1, '2025-03-04'))
    if not status:
        return "Insertion Failed"
    result = {
        "data": "inserted",
        "code": 200
    }
    return result

@app.route('/api/streak')
def StreakAPI():
    '''
    Case 1: Today's streak record already exist
        Do not update streak count
    Case 2: Yesterdays' streak record exists
        Use yesterday's streak count
    Case 3: If todays or yesterdays records do not exist
        Create a new record with streak count of 0
    '''
    query = "SELECT * FROM STREAK"
    data = get_records(query)
    result = {
        "data": data,
        "code": 200
    }

    return result

if __name__ == '__main__':
    print('App started')
    from . import db
    db.init_app(app)
    app.run(debug=True)


# flask run command with debug flag enables auto reload: flask --app filename --debug run