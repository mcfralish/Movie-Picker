"""Will give tmdb data"""

import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(
    find_dotenv()
)  # This is to load your API keys from .env if being run locally

BASE_URL = "https://api.themoviedb.org/3/movie/"
TMDB_API_KEY = os.getenv("TMDB_API_KEY")


def get_movie_data(id_no):
    """Returns data about a given movie"""

    params = {"api_key": TMDB_API_KEY}

    response = requests.get(BASE_URL + str(id_no), params=params)
    data = response.json()

    genres = []

    for i in range(len(data["genres"])):
        genres.append(data["genres"][i]["name"])

    movie_data = {
        "title": data["title"],
        "tagline": data["tagline"],
        "overview": data["overview"],
        "poster_path": data["poster_path"],
        "genres": genres,
    }

    return movie_data
