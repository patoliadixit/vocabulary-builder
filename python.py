import pymongo
import json
import os
import time
MONGOURI = "mongodb://127.0.0.1:27017/vocab"
my_list = []
rank = 1
print(os.getcwd())
with open('dictionary.json') as f:
    data = json.load(f)
with open('words.txt') as f:
    words_list = f.readlines()
for word_ in words_list:w
    try:
        word = dict()
        word["word"] = word_.split()[0].lower()
        word["meaning"] = data[word_.split()[0].lower()]
        word["rank"] = rank
        my_list.append(word)
        rank += 1
    except:
        pass
myclient = pymongo.MongoClient(MONGOURI)
mydb = myclient["vocab"]
mycol = mydb["words"]
mycol.insert_many(my_list)
