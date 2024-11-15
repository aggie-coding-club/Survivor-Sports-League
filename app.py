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
        
        # Print the response text for debugging
        print(response.text)
        
        # Parse the JSON data from the response
        data = response.json()
        
        # Extract team names
        team_names = Team.extract_team_names(data)
        
        # Example usage of the Team class
        teams = [Team(name=team_name, week=8) for team_name in team_names]
        
        # Check win/loss for each team
        result = Team(name='Los Angeles Rams', week=8).winorloss(data, 8)
        
        return jsonify(result)
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({
            'error': 'HTTP error occurred',
            'message': str(http_err)
        }), response.status_code
    
    except requests.exceptions.RequestException as req_err:
        return jsonify({
            'error': 'Request exception',
            'message': str(req_err)
        }), 500
    
    except json.JSONDecodeError as json_err:
        return jsonify({
            'error': 'JSON decode error',
            'message': str(json_err)
        }), 500
    
    except Exception as err:
        return jsonify({
            'error': 'An error occurred',
            'message': str(err)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)