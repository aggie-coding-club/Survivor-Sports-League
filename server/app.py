from flask import Flask, jsonify
import requests
import os
import json
from team import Team
from user import User
from cpu import CPU

app = Flask(__name__)

# Load environment variables (ensure you've set SPORTRADAR_API_KEY)
SPORTRADAR_API_KEY = os.getenv('SPORTRADAR_API_KEY', 'M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ')



@app.route('/')
def index():
    # Define the API endpoint
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/08/schedule.json"
    
    # Set up the query parameters, including the API key
    params = {
        'api_key': SPORTRADAR_API_KEY
    }
    
    # Define headers if necessary
    headers = {
        "Accept": "application/json"
    }

    try:
        # Make the GET request for schedule to the Sportradar API
        response = requests.get(url, headers=headers, params=params)
        
        # Raise an exception for HTTP errors
        response.raise_for_status()
        
        # Parse the JSON data from the response
        data = response.json()
        
        # Extract aliases
        week = "08"
        aliases = Team.teams_playing(week)
        
        print(Team("Los Angeles Rams").win_or_loss(week))

        # Return the aliases as a JSON response

        # Extract team names
        team_names = Team.teams_playing(week)

        # Example usage of the Team class
        teams = [Team(name=team_name) for team_name in team_names]

        # test = User("test")

        # test.initialize_team_names()

        # print(test.teams)

        # test.chosen = Team("Green Bay Packers")

        # test.check_win_loss("02")

        # print(test.teams)

        # test = CPU("test")

        # test.initialize_team_names()

        # print(test.teams)

        # test.chosen = Team(test.choose_random_team())

        # test.check_win_loss("02")

        # print(test.teams)

        # return jsonify([team.__repr__() for team in teams])
    
        # return jsonify({"aliases": aliases})
    
    except requests.exceptions.HTTPError as http_err:
        # Handle HTTP errors (e.g., 4xx and 5xx responses)
        return jsonify({
            'error': 'HTTP error occurred',
            'message': str(http_err)
        }), response.status_code
    
    except requests.exceptions.RequestException as req_err:
        # Handle other requests exceptions (e.g., connection errors)
        return jsonify({
            'error': 'Request exception',
            'message': str(req_err)
        }), 500
    
    except ValueError as json_err:
        # Handle JSON decoding errors
        return jsonify({
            'error': 'JSON decoding error',
            'message': str(json_err)
        }), 500

    except Exception as err:
        # Handle any other exceptions
        return jsonify({
            'error': 'An unexpected error occurred',
            'message': str(err)
        }), 500

if __name__ == '__main__':
    # It's good practice to not run in debug mode in production
    app.run(debug=True)