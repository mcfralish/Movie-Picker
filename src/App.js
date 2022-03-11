import './App.css';
import { useState, useEffect, useRef } from 'react';
import { CommentBlock } from './CommentBlock';


function App() {
  // Creates global variables used for this page. All are set to be state variables, yet only reviews is displayed in the state
  const [reviews, setReviews] = useState([]);
  const [inputText, setInputText] = useState();
  const [deletes, setDeletes] = useState([]);
  const [edits, setEdits] = useState([]);


  // Runs on initial rendering of page
  // It gets the reviews for the logged in user and loads them into the state variable reviews using setState
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
    });
  }, [])

  // Deletes the specified comment from the reviews list and enters the deleted id into another list called deletes
  // deletes will be passed when save is pressed
  function deleteComment(i) {
    console.log("Deleting review: ", reviews[i]);
    // Creates a copy of reviews as newReviews
    const newReviews = [...reviews];
    // Used splice to grab the removed index.
    // This function actually returns a list of items, but since only one is removed at a time, it is safe to always grab the 0 index
    const removed = newReviews.splice(i, 1)[0];
    console.log("New Reviews after splice: ", newReviews);
    console.log("Removed: ", removed);
    // Pushes removed id onto the list of deletes
    deletes.push(removed.id);
    console.log("Deletes: ", deletes)
    // Updates state variable revies to be newReviews, which is the same except excluding the deleted comment
    setReviews(newReviews);
    console.log("Reviews after set: ", reviews);
  }

  // Function that handles when a rating is changed.
  function changeRating(e, id) {
    console.log("Changing comment id: ", id)
    // Update is set to be a map of reviews
    const update = [...reviews].map(review => {
      // Checks each displayed rating against the one passed in, the one that will change.
      // If it has the same id, only one will, then it updates it in the state.
      if (review.id === id) {
        review.rating = e;
      }
      return review;
    })

    // Checks to see if the user has already changed the rating given in the specified comment.
    // If they have not, then it will be added to a list of changed ratings that will need to be updated after save.
    // If they have then it does nothing.
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
    //Updates the reviews state variable and sets the displayed number in the number input box to be e, or the event from the user
    setReviews(update);
    setInputText(e);
  }

  // Calls flask api to log out
  function logout() {
    // After the function, it will redirect to the /main page. This will redirect to login, since the user will no longer be logged in.
    console.log('logging out')
    fetch('/react_logout').then(response => response.json()).then(data => window.location = "/main")
  }

  // Passes in the changes made in this session to be updated in the DB through API interaction with Flask
  function save() {
    console.log("Saving Progress");

    // Makes 2 empty and mutable lists
    // json will be the Object passed to the API
    // editJson will be a list of key-value pairs that will represent the ids of the edited reviews and the new ratings given.
    // The key-value pair will be pushed onto editJson and then editJson will be pushed onto json
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

    // deletes needs not change, as it is already a list of the ids that will be deleted and that is all that is needed to make the required changes in the DB.
    json.push(deletes);

    // Calls the Flask API and POSTs json[]
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

  // Functio to handle when user hit Cancel
  // Will reset the deletes and edits to be empty and calls reload.
  function cancel() {
    console.log("Cancelling");
    reload();

  }

  // Resets reviews to be in line with the DB rather than the last known state
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
    });
  }

  // Redirects to main page
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
