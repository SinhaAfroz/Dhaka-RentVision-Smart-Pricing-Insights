from flask import Flask, request, jsonify
import utill

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': utill.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    area = float(request.form['area'])
    location = request.form['location']
    beds = int(request.form['beds'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': utill.get_estimated_price(location,area,beds,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    utill.load_saved_artifacts()
    app.run()