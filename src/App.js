import './App.css';
import { useState, useEffect} from 'react';
import { CommentBlock } from './CommentBlock';

function App() {

  const [reviews, setReviews] = useState({});
  useEffect(() => {
    console.log('getting user reviews')
    fetch('/get_reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((data) => {
       console.log(data);
       setReviews(data) });
   }, [])

  function deleteComment(i){
    console.log("Deleting comment")
    console.log(i)
    const newReviews = reviews.slice()
    newReviews.splice(i)
    setReviews(newReviews)    
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
        id = {review["id"]}
        title = {review["title"]}
        rating = {review["rating"]}
        comment = {review["comment"]} />
        <button onClick={() => {deleteComment(i)}}>Trashcan</button>
        </>)
        
        
  }


  return (
    <div className="">
      <header className="">
        <button onClick={logout}>Logout</button>
      </header>
      <ul>
        {Object.keys(reviews).map((review, i) => createBlock(reviews[review], i)
          )}
      </ul>
    </div>
  );
}

export default App;
