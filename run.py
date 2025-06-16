from app import create_app
from app.config import DEBUG, PORT, HOST


app = create_app()


if __name__ == "__main__":
    app.run(debug=DEBUG, port=int(PORT), host=HOST)
