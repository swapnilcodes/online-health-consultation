from flask import Flask
from flask import request
from flask import jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import json
import sys

app = Flask(__name__)


@app.route('/covid-test-checker-results', methods=['POST', 'GET'])
def covid_checker():
    if request.method == "POST":
        df = pd.read_csv('Covid Dataset.csv')
        df = df.replace(['Yes'], 1)
        df = df.replace(['No'], 0)
        X = df.drop(columns='COVID-19')
        Y = df.iloc[:, 20:]
        model = DecisionTreeClassifier()
        model.fit(X, Y)
        data = request.args

        test_data = {'Breathing Problem': [], "Fever": [], "Dry Cough": [], "Sore throat": [
        ], "Running Nose": [], "Asthma": [], "Chronic Lung Disease": [], "Headache": [], "Heart Disease": [], "Diabetes": [], "Hyper Tension": [], "Fatigue": [], "Gastrointestinal": [], "Abroad travel": [], "Contact with COVID Patient": [], "Attended Large Gathering": [], "Visited Public Exposed Places": [], "Family working in Public Exposed Places": [], "Wearing Masks": [], "Sanitization from Market": []}
        for key in data.keys():
            test_data[key] = [data.get(key)]
        print(test_data, file=sys.stderr)
        test_df = pd.DataFrame(test_data)
        test_df = test_df.replace(['Yes'], 1)
        test_df = test_df.replace(['No'], 0)
        predictions = model.predict(test_df)
        print(predictions)
        prediction = predictions[0]
        if prediction == 1:
            prediction = 'Yes'
        else:
            prediction = 'No'
        print(prediction, file=sys.stderr)
        return {'predictions': prediction}
    else:
        return {'request': 'get'}
