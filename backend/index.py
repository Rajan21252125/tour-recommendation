from flask import Flask, jsonify, request
from models.recommender import recommend_place, recommend_by_state_and_activity, get_all_states, get_all_types, get_types_by_state
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# API 1: Get all data
@app.route('/api/places', methods=['GET'])
def api_get_all_places():
    return jsonify(get_all_states())

# API 2: Get all unique types
@app.route('/api/types', methods=['GET'])
def api_get_all_types():
    return jsonify(get_all_types())

@app.route('/api/state-types', methods=['GET'])
def api_get_types_by_state():
    state = request.args.get('state')  # Get state from query parameters
    if not state:
        return jsonify({"error": "State parameter is required"}), 400

    return jsonify(get_types_by_state(state))


# API 3: Recommend Based on Given Place Name
@app.route('/api/recommend', methods=['GET'])
def api_recommend_place():
    place_name = request.args.get('place_name')

    if not place_name:
        return jsonify({"error": "Please provide 'place_name' parameter."})

    return jsonify(recommend_place(place_name))

# API 4: Recommend Based on State and Activity
@app.route('/api/recommend-by-state', methods=['GET'])
def api_recommend_by_state_and_activity():
    state = request.args.get('state')
    activity = request.args.get('types')

    print(state, activity)
    if not state or not activity:
        return jsonify({"error": "Please provide both 'state' and 'activity' parameters."})

    return recommend_by_state_and_activity(state, activity)

if __name__ == '__main__':
    app.run(debug=True)
