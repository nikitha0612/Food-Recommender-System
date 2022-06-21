from flask import Flask
import json
from Recommender import  getRecommendedItems
import psycopg2
import databaseCon

app = Flask(__name__)
@app.route("/predictions/<int:uid>",strict_slashes = False)
def predictions(uid):
    return json.dumps(getRecommendedItems(uid),indent=2)


@app.route("/createUser/<string:uid>",strict_slashes = False)
def createUser(uid):
    connection = psycopg2.connect(
        database="RecommenderDataBase", user='postgres', password='nikitha0612', host='127.0.0.1')
    cursor = connection.cursor()
    con = databaseCon.Database(connection,cursor)
    return  con.insertUser(uid)


@app.route("/getUser/<string:uid>",strict_slashes = False)
def getUser(uid):
    connection = psycopg2.connect(
        database="RecommenderDataBase", user='postgres', password='nikitha0612', host='127.0.0.1')
    cursor = connection.cursor()
    con = databaseCon.Database(connection, cursor)
    con = databaseCon.Database(connection,cursor)
    return  json.dumps(con.getUser(uid))

@app.route("/rateItem/<string:recipeName>/<int:ratedValue>/<string:uid>", strict_slashes = False)
def rateItem(recipeName,ratedValue,uid):
    connection = psycopg2.connect(
        database="RecommenderDataBase", user='postgres', password='nikitha0612', host='127.0.0.1')
    cursor = connection.cursor()
    con = databaseCon.Database(connection,cursor)
    return  con.rateItem(recipeName, ratedValue , uid)

@app.route("/getAll",strict_slashes = False)
def getAll():
    connection = psycopg2.connect(
        database="RecommenderDataBase", user='postgres', password='nikitha0612', host='127.0.0.1')
    cursor = connection.cursor()
    con = databaseCon.Database(connection, cursor)
    return json.dumps(con.getItems(),indent = 2)



if __name__ == '__main__':
    app.run(debug=True)


