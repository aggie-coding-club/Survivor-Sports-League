from flask import Flask, jsonify
import requests
import os
import json

app = Flask(__name__)

# Load environment variables (ensure you've set SPORTRADAR_API_KEY)
SPORTRADAR_API_KEY = os.getenv('SPORTRADAR_API_KEY', 'M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ')

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
            extract_team_names(value, team_names)
            
    elif isinstance(obj, list):
        for item in obj:
            extract_team_names(item, team_names)
    
    return team_names

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
        aliases = extract_team_names(data)
        
        # Return the aliases as a JSON response
        return jsonify({"aliases": aliases})
    
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