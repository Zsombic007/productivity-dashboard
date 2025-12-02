from flask import Blueprint, jsonify

routes = Blueprint("routes", __name__)

@routes.get("/")
def home():
    return jsonify({"message":"Flask backend is running!"})