import './App.css';
import { useState, useEffect, useRef } from 'react';
import { CommentBlock } from './CommentBlock';


function App() {
  const [reviews, setReviews] = useState([]);
  const [initial, setInitial] = useState([]);
  const [inputText, setInputText] = useState();
  const [deletes, setDeletes] = useState([]);
  const [edits, setEdits] = useState([]);


  useEffect(() => {
    console.log('getting user reviews')
    fetch('/get_reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((data) => {
      console.log("Starting data: ", data);
      setReviews(data)
      setInitial(data)
    });
  }, [])

  function deleteComment(i) {
    console.log("Deleting review: ", reviews[i]);
    const newReviews = [...reviews];
    const removed = newReviews.splice(i, 1)[0];
    console.log("New Reviews after splice: ", newReviews);
    console.log("Removed: ", removed);
    deletes.push(removed.id);
    console.log("Deletes: ", deletes)
    setReviews(newReviews);
    console.log("Reviews after set: ", reviews);
  }

  function changeRating(e, id) {
    console.log("Changing comment id: ", id)
    const update = [...reviews].map(review => {
      if (review.id === id) {
        review.rating = e;
      }
      return review;
    })

    let alreadyChanged = false;
    for (var i = 0; i < edits.length; i++) {
      if (id === edits[i]) {
        alreadyChanged = true;
      }
    }

    if (!alreadyChanged) {
      edits.push(id);
    }

    console.log("Updated Review: ", update);
    console.log("Edits: ", edits)
    setReviews(update);
    setInputText(e);
  }

  function logout() {
    console.log('logging out')
    fetch('/react_logout').then(response => response.json()).then(data => window.location = "/main")
  }

  function save() {
    console.log("Saving Progress");
    let json = [];
    let editJson = []
    for (var i = 0; i < edits.length; i++) {
      var newEdit = {
        id: edits[i],
        rating: reviews[i].rating
      }
      editJson.push(newEdit);
    }

    json.push(editJson);
    json.push(deletes);
    console.log("Pushing to DB: ", JSON.stringify(json))
    fetch("/save", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(json)
    })
    window.alert('Save Successful')
  }

  function cancel() {
    console.log("Cancelling");
    reload();

  }

  function reload() {
    console.log('getting user reviews')
    fetch('/get_reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((data) => {
      console.log("Starting data: ", data);
      setReviews(data)
      setInitial(data)
    });
  }

  function goToMain() {
    window.location = "/main"
  }

  return (
    <div class="app">
      <nav>
        <button onClick={goToMain}>Movie Browser</button>
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Your Reviews</h1>
      <ul>
        {reviews.map((review, i) => (
          <div>
            <CommentBlock
              title={review.title}
              comment={review.comment}
              rating={review.rating}
              onDeleteButton={() => deleteComment(i)}
              onRatingChange={(e) => changeRating(e.target.value, review.id)}
            />
          </div>
        ))}
      </ul>
      <button onClick={save}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default App;
