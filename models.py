from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    uid = db.Column(db.String(120), unique=True, nullable=False)
    pw = db.Column(db.String(120), nullable=False)
    fname = db.Column(db.String(120), nullable=False)
    lname = db.Column(db.String(120), nullable=False)


class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movieid = db.Column(db.Integer, nullable=False)
    uid = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Integer)
    rev = db.Column(db.String(500))
