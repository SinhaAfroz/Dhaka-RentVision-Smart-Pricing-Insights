import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, area, beds, bath):

    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = area  # beds is the first column
    x[1] = beds  # bath is the second column
    x[2] = bath  # area is the third column

    if loc_index >= 0:
        x[loc_index] = 1  # set the location index to 1

    try:
        prediction = __model.predict([x])[0]
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None

    return round(prediction, 2)



def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]  # location names start from index 3

    global __model
    if __model is None:
        with open('./artifacts/dhaka_home_rent_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")


def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('Adabor',1000, 3, 3))
