import flask
import os
import random
from dotenv import find_dotenv, load_dotenv
from flask_login import current_user, LoginManager, login_user, logout_user
from tmdb import get_movie_data
from wiki import get_wiki
from models import db, Users, Reviews

load_dotenv(find_dotenv())
app = flask.Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("NEW_DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

login_manager = LoginManager()
login_manager.init_app(app)

db.init_app(app)
with app.app_context():
    db.create_all()


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/")
def index():
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly

    if not current_user.is_authenticated:
        return flask.redirect(flask.url_for("login"))

    return flask.render_template(
        "index.html",
    )


app.register_blueprint(bp)


@app.route("/main", methods=["POST", "GET"])
def main():

    if not current_user.is_authenticated:
        return flask.redirect(flask.url_for("login"))

    movies = [
        8587,  # The Lion King
        786,  # Almost Famous
        252,  # Willy Wonka
        550988,  # Free Guy
        583406,  # Judas & Black Messiah
        129,  # Spirited Away
        9479,  # Nightmare B4 Christmas
        556574,  # Hamilton
        354912,  # Coco
        1422,  # The Departed
        38,  # Eternal Sunshine
        515001,  # Jojo Rabbit
        14160,  # Up
        752,  # V for Vendetta
        313369,  # La La Land
        141,  # Donnie Darko
        556984,  # Chicago 7
        371645,  # Wilderpeople
        286217,  # Martian
        1587,  # Gilbert Grape
        773,  # Little Miss Sunshine
        9377,  # Ferris Bueller
        630,  # Wiz of Oz
        277834,  # Moana
        4951,  # 10 Things IHAU
        8321,  # In Bruges
    ]

    displayed_ids = random.sample(movies, 3)
    displayed = []

    for id in range(3):
        displayed.append(get_movie_data(displayed_ids[id]))

    for movie in displayed:
        movie["wiki_link"] = get_wiki(movie["title"])

    glengths = []
    for i in range(3):
        glengths.append(len(displayed[i]["genres"]))

    displayed_posts = {"users": [], "ratings": [], "reviews": []}
    num_reviews = []

    for i in range(3):
        this_users = []
        this_ratings = []
        this_reviews = []
        number = 0
        movie_reviews = Reviews.query.filter_by(movieid=displayed_ids[i]).all()
        for j in range(len(movie_reviews)):

            this_users.append(movie_reviews[j].uid)
            this_ratings.append(movie_reviews[j].rating)
            this_reviews.append(movie_reviews[j].rev)
            number += 1
        displayed_posts["users"].append(this_users)
        displayed_posts["ratings"].append(this_ratings)
        displayed_posts["reviews"].append(this_reviews)
        num_reviews.append(number)

    return flask.render_template(
        "main.html",
        poster_url="https://image.tmdb.org/t/p/w500/",
        displayed=displayed,
        displayed_ids=displayed_ids,
        glengths=glengths,
        displayed_posts=displayed_posts,
        num_reviews=num_reviews,
    )


@app.route("/handle_review", methods=["POST"])
def handle_review():
    data = flask.request.form

    if "rating" in data:
        rate = data["rating"]

    else:
        rate = None

    new_rev = Reviews(
        movieid=data["movieid"],
        uid=current_user.uid,
        rating=rate,
        rev=data["review"],
    )
    db.session.add(new_rev)
    db.session.commit()

    return flask.redirect(flask.url_for("main"))


@app.route("/handle_logout")
def handle_logout():
    logout_user()
    return flask.redirect(flask.url_for("main"))


@app.route("/react_logout")
def react_logout():
    logout_user()
    return flask.jsonify("ignored")


@app.route("/get_reviews")
# Manually convert reviews to dicts
def get_reviews():
    revs = Reviews.query.filter_by(uid=current_user.uid).all()
    return flask.jsonify(revs)


@app.route("/login", methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        flask.redirect(flask.url_for("main"))

    return flask.render_template("login.html")


@app.route("/handle_login", methods=["GET", "POST"])
def handle_login():

    data = flask.request.form

    if Users.query.filter_by(uid=data["uid"]).first() == None:
        flask.flash("No such username. Retry or Create an account now.")
        return flask.redirect(flask.url_for("login"))

    visitor = Users.query.filter_by(uid=data["uid"]).first()
    if visitor.pw != data["pw"]:
        flask.flash("Incorrect Password")
        flask.redirect(flask.url_for("login"))

    else:
        login_user(visitor)
        flask.redirect(flask.url_for("main"))

    return flask.redirect(flask.url_for("main"))


@app.route("/signup", methods=["POST", "GET"])
def signup():
    return flask.render_template("signup.html")


@app.route("/handle_signup", methods=["POST"])
def handle_signup():
    data = flask.request.form

    new_user = Users(
        email=data["email"],
        uid=data["uid"],
        pw=data["pw"],
        fname=data["fname"],
        lname=data["lname"],
    )

    if Users.query.filter_by(uid=data["uid"]).first() == None:
        db.session.add(new_user)
        db.session.commit()
        print("Added to DB")
        return flask.redirect(flask.url_for("login"))

    else:
        flask.flash("User already exists. Please try another name or sign in now.")
        return flask.redirect(flask.url_for("signup"))


app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True)
