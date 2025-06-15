from flask import jsonify
from core import app
from db_operations import (
    create_user,
    get_user,
    get_all_users,
    edit_user,
    delete_user
)
from flask import request


@app.route("/api/users", methods=["GET"])
def get_api_users():
    return jsonify(get_all_users())


@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_api_user(user_id):
    try:
        user = get_user(user_id)
        return jsonify(user)
    except ValueError:
        return jsonify({"error": "user not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_api_user(user_id):
    try:
        data = delete_user(user_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/<int:user_id>", methods=["PUT"])
def edit_api_user(user_id):
    payload = request.get_json()
    if not payload:
        return jsonify({"error": "no data provided with the request"}), 400
    username = payload.get("username")
    email = payload.get("email")
    password = payload.get("password")

    if (
        not username
        or not email
        or not password
    ):
        return jsonify({"error":
                        "invalid data provided with the request"}), 400
    try:
        data = edit_user(
            id=user_id,
            username=username,
            email=email,
            password=password
        )
        return jsonify({
            "message": "User edited successfully",
            "user": data
        }), 200
    except ValueError:
        return jsonify({"error": "User not found"}), 404


@app.route("/api/users", methods=["POST"])
def create_api_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "no data provided with the request"}), 400
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if (
        not username
        or not email
        or not password
    ):
        return jsonify({"error":
                        "invalid data provided with the request"}), 400
    try:
        new_user = create_user(username, email, password)
        return jsonify({
                "message": "User created successfully",
                "user": new_user
            }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
