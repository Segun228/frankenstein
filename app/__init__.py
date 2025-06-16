from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///frankenstein.db'

    db.init_app(app)
    CORS(app)

    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app
