from flask import Flask, jsonify
import requests
import os
import json



# Load environment variables (ensure you've set SPORTRADAR_API_KEY)
SPORTRADAR_API_KEY = os.getenv('SPORTRADAR_API_KEY', 'M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ')

#returns data for current week
def get_current_week(week):
    # Define the API endpoint
    url = f"https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/" + week + "/schedule.json"
    # Set up the query parameters, including the API key
    params = {
        'api_key': SPORTRADAR_API_KEY
    }
    
    # Define headers if necessary
    headers = {
        "Accept": "application/json"
    }

    # Make the GET request for schedule to the Sportradar API
    response = requests.get(url, headers=headers, params=params)
    
    # Raise an exception for HTTP errors
    response.raise_for_status()
    
    # Parse the JSON data from the response
    data = response.json()

    return data

#returns data for entire season
def get_season_data():
    # Define the API endpoint
    url = 'https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/REG/standings/season.json?api_key=M31MHThjj9azPcbv3OTqSs3mSTWTKSz8VMthJGrZ'

    # Set up the query parameters, including the API key
    params = {
        'api_key': SPORTRADAR_API_KEY
    }
    
    # Define headers if necessary
    headers = {
        "Accept": "application/json"
    }

    # Make the GET request for schedule to the Sportradar API
    response = requests.get(url, headers=headers, params=params)
    
    # Raise an exception for HTTP errors
    response.raise_for_status()
    
    # Parse the JSON data from the response
    data = response.json()

    return data