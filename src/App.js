import './App.css';
import { useState, useRef } from 'react';
import { CommentBlock } from './CommentBlock';

function App() {

  const [rating, setRating] = useState(["rating"]);
  fetch('/get_reviews').then(response => response.json()).then(data => { setRating(data) })
  const inputRef = useRef(null);

  function logout() {
    console.log('logging out')
    fetch('/react_logout').then(response => response.json()).then(data => window.location = "/main")
  }


  return (
    <div className="">
      <header className="">
        <button onClick={logout}>Logout</button>
        <p>{rating}</p>
      </header>
      <ul>
        {/* {CommentBlock.map()} */}
      </ul>
    </div>
  );
}

export default App;
