from flask import Flask
import requests
from team import *

app = Flask(__name__)

class User:
    def __init__(self, user_name):
        self.user_name = user_name
        self.chosen = None
        self.teams = []

    def get_team_names(self):
        url = 'https://api.sportradar.com/nfl/official/trial/v7/en/league/teams.json?api_key=M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ'

        headers = {"Accept": "application/json"}
        try:
            # Fetch the data from the API
            response = requests.get(url, headers=headers)
            response.raise_for_status()

            # Parse the JSON response
            data = response.json()
            teams = data.get('teams', {})
            team_list = []
            for team in teams:
                market = team.get('market')
                name = team.get('name')
                team_name = market + " " + name
                if(name != 'TBD'):
                    team_list.append(team_name) # Appends the teams names         

            # return team list list
            return team_list

        except requests.exceptions.RequestException as err:
            print(f"Error: {err}")
            return "Error occurred while fetching data"
    
    def initialize_team_names(self):
        self.teams = self.get_team_names()

    def check_win_loss(self, week):
        result = self.chosen.win_or_loss(week);
        if(result):
            self.teams.remove(self.chosen.name)
        
        return self.teams

if __name__ == '__main__':
    app.run(debug=True)
