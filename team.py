import requests
import os

SPORTRADAR_API_KEY = os.getenv('SPORTRADAR_API_KEY', 'M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ')

class Team:
    def __init__(self, name, week):
        self.name = name
        self.week = week

    def __repr__(self):
        return f"Team(name={self.name}, week={self.week})"
    
    #returns the teams playing for a certain week
    def extract_team_names(obj, team_names=None):
        if team_names is None:
            team_names = []
        
        if isinstance(obj, dict):
            # Check if the current dictionary contains 'home' or 'away'
            if 'home' in obj and 'name' in obj['home']:
                team_names.append(obj['home']['name'])
            if 'away' in obj and 'name' in obj['away']:
                team_names.append(obj['away']['name'])
            
            # Recur for other items in the dictionary
            for key, value in obj.items():
                Team.extract_team_names(value, team_names)
                
        elif isinstance(obj, list):
            for item in obj:
                Team.extract_team_names(item, team_names)
        
        return team_names


    #returns whether team won or lost in a certain week
    def winorloss(self, data, week):
        print(f"Finding win/loss for team: {self.name}")
        aliases = self.extract_team_names(data)
        #print(f"Extracted aliases: {aliases}")
        week = data.get('week', {})
        for game in week.get('games', {}):
            home_team = game.get('home', {}).get('name')
            away_team = game.get('away', {}).get('name')
            home_points = game.get('scoring', {}).get('home_points')
            away_points = game.get('scoring', {}).get('away_points')
            
            if home_team == self.name:
                if home_points > away_points:
                    return 'win'
                else:
                    return 'loss'
            elif away_team == self.name:
                if away_points > home_points:
                    return 'win'
                else:
                    return 'loss'
            print(f"{home_team}  vs  {away_team}")
        
        return 'no game found'