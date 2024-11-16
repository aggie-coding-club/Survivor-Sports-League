from flask import Flask, jsonify
import requests
import os
import json
from team import Team

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
        # Make the GET request to the Sportradar API
        response = requests.get(url, headers=headers, params=params)
        
        # Raise an exception for HTTP errors
        response.raise_for_status()
        
        # Parse the JSON data from the response
        data = response.json()
        
        # Extract aliases
        aliases = Team.extract_team_names(data)
        
        print(Team("Los Angeles Rams", 8).winorloss(data, 8))

        # Return the aliases as a JSON response

        # Extract team names
        team_names = Team.extract_team_names(data)
        
        # Example usage of the Team class
        teams = [Team(name=team_name, week=8) for team_name in team_names]
        
        return jsonify([team.__repr__() for team in teams])
    
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