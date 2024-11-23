from team_controller import *

class Team:
    def __init__(self, name):
        self.name = name
        self.wins = 0
        self.losses = 0

    def __repr__(self):
        return f"Team(name={self.name})"
    
    
    # Load environment variables (ensure you've set SPORTRADAR_API_KEY)
    SPORTRADAR_API_KEY = os.getenv('SPORTRADAR_API_KEY', 'M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ')

    #returns the teams playing for a certain week
    def teams_playing(week, team_names=None):
        data = get_current_week(week)

        if team_names is None:
            team_names = []
        
        week = data.get('week', {})

        games = week.get('games', {})

        for game in games:
            home_team = game.get('home').get('name')
            away_team = game.get('away').get('name')

            if home_team not in team_names:
                team_names.append(home_team)
            if away_team not in team_names:
                team_names.append(away_team)
        
        return team_names

    #returns whether team won or lost in a certain week
    def win_or_loss(self, week):
        # Parse the JSON data from the response
        data = get_current_week(week)

        week = data.get('week', {})
        for game in week.get('games', {}):
            home_team = game.get('home', {}).get('name')
            away_team = game.get('away', {}).get('name')
            home_points = game.get('scoring', {}).get('home_points')
            away_points = game.get('scoring', {}).get('away_points')
            
            if home_team == self.name:
                if home_points > away_points:
                    return True
                else:
                    return False
            elif away_team == self.name:
                if away_points > home_points:
                    return True
                else:
                    return False
        
        return 'no game found'

    def team_record(self, data, week):
        data = get_season_data()

        print(f"Finding win/loss for team: {self.name}")
        
        conference = data.get('conferences', {})

        for division in conference.get('divisions', {}):
            for team in division.get('teams', {}):
                if team.get('name') == self.name:
                    return team.get('wins'), team.get('losses')
        
        return 'no game found'