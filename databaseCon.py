import psycopg2

class Database:

    def __init__(self,connection,cursor):
        self.connection = connection
        self.cursor = cursor


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

        self.cursor.execute("SELECT rating, Users_idUsers, Recipe_idRecipe from rating;")
        rows = self.cursor.fetchall()

        for r in rows:
            ratings.append(r[0])
            users.append(r[1])
            items.append(r[2])
        data.append(users)
        data.append(items)
        data.append(ratings)

        return data
    def getNames(self,iid):
        self.cursor.execute("select recipeName from recipe where idRecipe = " + str(iid) + ";" )
        rows = self.cursor.fetchall()
        return rows[0]

    def insertUser(self,uid):
        self.cursor.execute("Insert into users (idfirebase) values ('" + str(uid) +"');")
        self.connection.commit()
        return "User created"

    def getUser(self, uid):
        self.cursor.execute("select idusers from users where idfirebase = " + str(uid) + ";")
        rows = self.cursor.fetchall()
        return rows[0]

    def rateItem(self,recipeName, ratingValue,uid):
        self.cursor.execute("INSERT INTO rating(rating, users_idusers, recipe_idrecipe) VALUES ("+str(ratingValue)+","+"(select idUsers from  users where idFirebase = " + "'" + str(uid) + "'" + " )" +" , (select  idRecipe from recipe where recipename = " + "'" +recipeName + "'" + "))")

        self.connection.commit()
        return "Recipe rated"
    def getItems(self):
        self.cursor.execute("Select recipename from recipe")
        rows  =self.cursor.fetchall()
        return rows



