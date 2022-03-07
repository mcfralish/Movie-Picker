import logo from './logo.svg';
import './App.css';

function App() {

  function logout() {
    console.log('logging out')
    fetch('/handle_logout', method = "POST")
  }


  return (
    <div className="">
      <header className="">
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
