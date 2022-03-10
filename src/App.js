import './App.css';
import { useState, useEffect, useRef } from 'react';
import { DeleteButton } from './DeleteButton';
import { CommentBlock } from './CommentBlock';

function App() {

  const [reviews, setReviews] = useState([]);
  const [inputText, setInputText] = useState();
  // const [deletes, setDeletes] = useState([]);
  let deletes = [];
  let edits = [];
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
    setReviews(newReviews);
    console.log("Reviews after set: ", reviews);
    return;
  }

  function changeRating(e, id) {
    const update = [...reviews].map(review => {

      console.log("ID: ", id);

      if (review.id === id) {
        review.rating = e;
      }
      return review;
    })

    console.log("Updated Review: ", update);
    setReviews(update);
    setInputText(e);

    // const newReviews = reviews;
    // console.log("New Reviews: ", newReviews);
    // console.log("New Reviews[i]['rating']", newReviews[i]["rating"]);
    // console.log("newRatings: ", newRatings);
    // console.log("newRatings[i]: ", newRatings[i])
    // const val = newRatings[i].current.value;
    // newReviews[i]["rating"] = val;
    // console.log("After rating change: ", newReviews[i]["rating"]);
  }

  function logout() {
    console.log('logging out')
    fetch('/react_logout').then(response => response.json()).then(data => window.location = "/main")
  }

  function save() {
    console.log("Saving Progress");
    console.log("Passing deletes: ", JSON.stringify(deletes));
    console.log("Passing edits: ", JSON.stringify(edits));
    fetch("/save_deletes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deletes)
    })
  }

  function showDelete(){
    return 
  }


  // function createBlock(review, i) {
  //   console.log("Title: ", review["title"]);
  //   console.log("Rating: ", review["rating"]);
  //   console.log("Comment: ", review["comment"]);
  //   return (
  //     <>
  //       <CommentBlock
  //         id={review["id"]}
  //         title={review["title"]}
  //         rating={review["rating"]}
  //         comment={review["comment"]} />
  //       <input type="text" ref={newRatings[i]} placeholder="New Rating" />
  //       <button onClick={() => { changeRating(i) }}>Edit Rating</button>
  //       <button onClick={() => { deleteComment(i) }}>Trash</button>
  //     </>)


  // }

  return (
    <div className="">
      <header className="">
        <button onClick={logout}>Logout</button>
      </header>
      <ul>
        {/* {Object.keys(reviews).map((review, i) => createBlock(reviews[review], i))} */}
        {reviews.map((review, i) => (
          <p>Title: {review.title}

            <input type="number" min="1" max="5" value={review.rating} onChange={(e) => changeRating(e.target.value, review.id)} />
            <br/>
            <p>{review.comment}</p>
            {showDelete(i)}
            {/* <CommentBlock comment={comment} onClick={() => deleteComment(i, comment)} /> */}
          </p>
        ))}
      </ul>
      <button onClick={save}>Save</button>
    </div>
  );
}

export default App;
