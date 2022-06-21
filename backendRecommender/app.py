from flask import Flask
import json
import databaseCon
from Recommender import getRecommendedItems
app= Flask(__name__)
@app.route("/predictions/<int:uid>", strict_slashes = False)
def predictions(uid):
    con = databaseCon.Database()
    #userid = con.getUser(uid)
    #print(userid)
    return json.dumps(getRecommendedItems(uid), indent=2)
@app.route("/getall", strict_slashes = False)
def getall():
    con = databaseCon.Database()
    #userid = con.getUser(uid)
    #print(userid)
    return json.dumps(con.getItems(), indent=2)

@app.route("/createUser/<string:uid>", strict_slashes = False)
def createUser(uid):
    con = databaseCon.Database()
    return con.insertUser(uid)

@app.route("/getUser/<string:uid>", strict_slashes = False)
def getUser(uid):
    con = databaseCon.Database()
    return json.dumps(con.getUser(uid), indent=2)

@app.route("/rateItem/<string:recipeName>/<int:ratedValue>/<string:uid>", strict_slashes = False)
def rateItem(recipeName, ratedValue,uid):
    con = databaseCon.Database()
    return con.rateItem(recipeName, ratedValue, uid)
#predictions('MT41djI1uGWNclpiNBIQfSGUX183')

@app.route("/get_recipe_details/<string:recipedetails>", strict_slashes = False)
def get_recipe_details(recipedetails):
    con = databaseCon.Database()
    return json.dumps(con.getdetails(recipedetails), indent=2)

if __name__ == '__main__':
    app.run(debug=True)