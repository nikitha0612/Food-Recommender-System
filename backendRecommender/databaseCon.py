import psycopg2

class Database:

    def __init__(self):
        self.connection = psycopg2.connect(user='postgres', password='postgres', host='127.0.0.1', database='recommenderdata')
        self.cursor = self.connection.cursor()


    def insert(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except:
            self.connection.rollback()


    def selectAll(self):
        data = []
        users = []
        items = []
        ratings = []

        self.cursor.execute("SELECT rating, users_idusers, recipe_idrecipe from rating;")
        rows = self.cursor.fetchall()

        for r in rows:
            ratings.append(r[0])
            users.append(r[1])
            items.append(r[2])

        data.append(users)
        data.append(items)
        data.append(ratings)

        return data
    def getNames(self, iid):
        self.cursor.execute("SELECT recipename,details FROM recipe where idrecipe = " + str(iid) + " ;")
        rows = self.cursor.fetchall()
        print(rows)

        return rows
    def getItems(self):
        self.cursor.execute("SELECT recipename,details FROM recipe")
        rows = self.cursor.fetchall()
        print(rows)
        return rows
    def getdetails(self,recipe_details):
        self.cursor.execute("SELECT details FROM recipe where recipename = \'"+ recipe_details +"\';")
        rows = self.cursor.fetchall()
        print(rows)
        return rows[0]

    def insertUser(self, uid):

        self.cursor.execute("INSERT INTO users(idfirebase) VALUES ('" + str(uid) + "');")
        self.connection.commit()
        return "user created"
    def getUser(self, uid):
        self.cursor.execute("SELECT idusers FROM users where idfirebase =  " + str(uid) + " ;")
        rows = self.cursor.fetchall()

        return rows[0]


    def rateItem(self, recipeName, ratingValue,uid):

        self.cursor.execute("INSERT INTO rating(rating, users_idusers, recipe_idrecipe) VALUES ('"+ str(ratingValue) +"',(select idusers from users where idfirebase = \'" + str(uid) +"\'),(select idrecipe from recipe where recipename = \'"+ recipeName +"\'));")
        self.connection.commit()
        return "Item Rated"






