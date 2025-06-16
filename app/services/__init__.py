from app import db
from app.models import Post


def create_user(username, email, password):
    new_user = Post(
        username=username, 
        email=email, 
        password=password
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user.to_dict()


def edit_user(id, username=None, email=None, password=None):
    user = Post.query.get(id)
    if not user:
        raise ValueError("No corresponding user by given id")
    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    if password is not None:
        user.password = password
    db.session.commit()
    return user.to_dict()


def delete_user(id):
    user = Post.query.get(id)
    if not user:
        raise ValueError("No corresponding user by given id")
    data = user.to_dict()
    db.session.delete(user)
    db.session.commit()
    return data


def get_user(id):
    user = Post.query.get(id)
    if not user:
        raise ValueError("No corresponding user by given id")
    return user.to_dict()


def get_all_users():
    users = Post.query.all()
    return [user.to_dict() for user in users]
