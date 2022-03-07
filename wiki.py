import requests

S = requests.Session()

BASE_URL = "https://en.wikipedia.org/w/api.php"


def get_wiki(keyword):
    params = {
        "action": "query",
        "format": "json",
        "titles": keyword,
        "prop": "info",
        "inprop": "url",
    }

    response = S.get(url=BASE_URL, params=params)
    data = response.json()["query"]["pages"]
    page_id = list(data)[0]

    url = data[page_id]["fullurl"]

    return url


get_wiki("The Lion King")
