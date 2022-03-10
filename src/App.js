import './App.css';
import { useState, useEffect, useRef } from 'react';
import { CommentBlock } from './CommentBlock';

function App() {

  const [reviews, setReviews] = useState([]);
  // const [deletes, setDeletes] = useState([]);
  let deletes = []
  const [edits, setEdits] = useState([]);
  const newRatings = useRef(new Array());

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

  function deleteComment(i) {
    console.log("Deleting comment: ", i);
    console.log("Reviews before delete: ", reviews);
    console.log("Reviews[i]: ", reviews[i]);
    console.log("Set New Reviews as copy")
    const newReviews = reviews;
    console.log("New Reviews: ", newReviews);
    console.log("Splicing newReviews")
    const removed = newReviews.splice(i, 1);
    console.log("New Reviews after splice: ", newReviews);
    console.log("Removed: ", removed);
    deletes.push(removed);
    console.log("Deletes: ", deletes)
    // setReviews(newReviews);
    setReviews(() => ({
      newReviews
    }))
    console.log("Reviews after set: ", reviews);
    return;
  }

  function changeRating(i, newrating) {
    const newReviews = reviews;
    console.log("New Reviews: ", newReviews);
    console.log("New Reviews[i]['rating']", newReviews[i]["rating"]);
    console.log("newRatings: ", newRatings);
    console.log("newRatings[i]: ", newRatings[i])
    const val = newRatings[i].current.value;
    newReviews[i]["rating"] = val;
    console.log("After rating change: ", newReviews[i]["rating"]);
  }

  function logout() {
    console.log('logging out')
    fetch('/react_logout').then(response => response.json()).then(data => window.location = "/main")
  }

  function createBlock(review, i) {
    console.log("Title: ", review["title"]);
    console.log("Rating: ", review["rating"]);
    console.log("Comment: ", review["comment"]);
    return (
      <>
        <CommentBlock
          id={review["id"]}
          title={review["title"]}
          rating={review["rating"]}
          comment={review["comment"]} />
        <input type="text" ref={newRatings[i]} placeholder="New Rating" />
        <button onClick={() => { changeRating(i) }}>Edit Rating</button>
        <button><img src='./trash.jpg' alt='trash can' onClick={() => { deleteComment(i) }} /></button>
      </>)


  }

  return (
    <div className="">
      <header className="">
        <button onClick={logout}>Logout</button>
      </header>
      <ul>
        {Object.keys(reviews).map((review, i) => createBlock(reviews[review], i))}
      </ul>
    </div>
  );
}

export default App;
