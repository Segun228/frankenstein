from main import app
import db_operations

with app.app_context():
    db_operations.create_user("Нестор", "nestor@example.com", "123456")
    db_operations.create_user("хто", "да", "123456")
    posts = db_operations.get_all_users()
    for post in posts:
        print(post["username"], post["email"])
