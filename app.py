from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    headers = {"accept": "application/json"}    
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/05/schedule.json?api_key=M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ"

    req = requests.get(url, headers)
    print(req.content)
    data=json.loads(req.content)
    return render_template('index.html', data=data)