import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import jsonify
import requests
import numpy as np


# Load dataset
# DATA_URL = "https://docs.google.com/spreadsheets/d/1zPWv1zBRz0bzrsTnlz4DIqhWbyiyj_csj-MVXViGKjI/edit?usp=sharing"
LOCAL_CSV_PATH = "./dataset/Tour_updated.xlsx"

# Download and save the CSV file
# response = requests.get(DATA_URL)
# if response.status_code == 200:
#     with open(LOCAL_CSV_PATH, "wb") as file:
#         file.write(response.content)
#     print("CSV file downloaded successfully.")
# else:
#     print("Failed to download CSV file. Check the URL or permissions.")

# Load the CSV file
data = pd.read_excel(LOCAL_CSV_PATH)

# Feature Engineering
data['features'] = data['Type'].astype(str) + ' ' + data['Significance'].astype(str) + ' ' + data['City'].astype(str)

# Vectorize Features
vectorizer = TfidfVectorizer(stop_words='english')
feature_matrix = vectorizer.fit_transform(data['features'])

# Calculate Similarity
similarity = cosine_similarity(feature_matrix)

# Function 1: Recommend Based on Given Place Name
def recommend_place(place_name, top_n=10):
    if place_name not in data['Name'].values:
        return {"error": "Place not found!"}

    # Get index of the given place
    place_index = data[data['Name'] == place_name].index[0]

    # Get similarity scores for the place
    scores = list(enumerate(similarity[place_index]))

    # Sort by similarity
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)

    # Recommend top N places
    recommendations = [data.iloc[i[0]].to_dict() for i in sorted_scores[1:top_n+1]]

    return {"recommended_places": recommendations}

# Function 2: Recommend Based on State & Activity
def recommend_by_state_and_activity(state, activity, top_n=10):
    filtered_data = data[
        (data['State'].str.contains(state, case=False, na=False)) &
        (data['Significance'].str.contains(activity, case=False, na=False))
    ]

    if filtered_data.empty:
        return jsonify({"error": "No places found for the given state and activity."})

    # Convert to dict and handle NaN values
    result = filtered_data.head(top_n).replace({np.nan: None}).to_dict(orient='records')

    return jsonify(result)

# Function 3: Get All Data
def get_all_states():
    return {"states": sorted(data['State'].dropna().unique().tolist())}

# Function 4: Get All Unique Types
def get_all_types():
    return {"types": sorted(data['Type'].dropna().unique().tolist())}  # Sorting the types

def get_types_by_state(state):
    # Filter rows where State exactly matches the input (case insensitive)
    filtered_data = data[data['State'].str.strip().str.lower() == state.strip().lower()]
    
    # Extract unique types from the filtered data and sort
    types = sorted(filtered_data['Significance'].dropna().unique().tolist())

    return {"types": types}
