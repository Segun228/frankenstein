from core import app
import routes
from config.config import DEBUG, PORT, HOST

if __name__ == "__main__":
    app.run(debug=DEBUG, port=int(PORT), host=HOST)
