from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import cloudpickle

app = Flask(__name__)

# Apply CORS to all routes with more explicit configuration
CORS(app, origins=["http://localhost:5173"], allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "OPTIONS"], supports_credentials=True)

# Load the model
with open("./trained_model.pkl", "rb") as file:
    model = cloudpickle.load(file)

@app.route("/api/predict", methods=["POST", "OPTIONS"])
def getSocks():
    try:
        # Handle OPTIONS request explicitly
        if request.method == "OPTIONS":
            response = jsonify({})
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
            response.headers.add("Access-Control-Allow-Methods", "POST,OPTIONS")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            return response
            
        data = request.get_json(force=True)

        print (data)

        # Convert the data to a list if it's one single object
        if isinstance(data, dict):
            data = [data]

        input_df = pd.DataFrame(data)  # Convert to dataframe

        # Make predictions
        y_pred = model.predict(input_df)

        response = jsonify(y_pred.tolist())
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        return response
    except Exception as e:
        return "Error", 501

@app.route('/api/status')
def status():
    response = jsonify({"message": "Prediction server is running"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    return response

if __name__ == "__main__":
    app.run(debug=True)
