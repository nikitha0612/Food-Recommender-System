import pandas as pd
from collections import defaultdict
import surprise
import surprise
from surprise.model_selection import cross_validate
import psycopg2
import databaseCon
connection =  psycopg2.connect(
   database="RecommenderDataBase", user='postgres', password='nikitha0612', host='127.0.0.1')
cursor = connection.cursor()

con = databaseCon.Database(connection,cursor)
data = con.selectAll()

userGroupId = data[0]
ingredientId = data[1]
ratings = data[2]


def do_Predict():
   ratings_dict = {'userID': userGroupId,
                   'itemID': ingredientId,
                   'rating': ratings}

   df = pd.DataFrame(ratings_dict)
   reader = surprise.Reader(rating_scale=(1, 4))
   data = surprise.Dataset.load_from_df(df[['userID', 'itemID', 'rating']], reader)
   trainset = data.build_full_trainset()
   algo = surprise.SVD()
   algo.fit(trainset)

   testset = trainset.build_anti_testset()
   predictions = algo.test(testset)
   cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
   return get_top_n(predictions)


def get_top_n(predictions, n=20):
   top_n = defaultdict(list)
   for uid, iid, true_r, est, _ in predictions:
      top_n[uid].append((iid, est))

   for uid, user_ratings in top_n.items():
      user_ratings.sort(key=lambda x: x[1], reverse=True)
      top_n[uid] = user_ratings[:n]

   return top_n


def getRecommendedItems(uid):
   itemInfo= []

   recommendations = do_Predict()
   for users in recommendations.items():
      if users[0] == uid:
         for items in users[1]:
            itemInfo.append(con.getNames(items[0]))
         return (itemInfo)


#print(getRecommendedItems(1))