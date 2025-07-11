from flask import Flask, jsonify, request
import pandas as pd
import pickle

app = Flask(__name__)

# Load the model
with open ("./trained_model.pkl", "rb") as file:
    model = pickle.load (file)

@app.route("/api/predict", methods=["POST"])
def getSocks ():
    data = request.get_json (force=True)

    # Convert the data to a list if it's one single object
    if isinstance(data, dict):
        data = [data]

    input_df = pd.DataFrame (data) # Convert to dataframe

    # Make predictions
    y_pred = model.predict (input_df)

    return jsonify (y_pred.tolist())
    

@app.route('/api/status')
def status ():
    return jsonify({"message": "Prediction server is running"})

if __name__ == "__main__":
    app.run(debug=True)