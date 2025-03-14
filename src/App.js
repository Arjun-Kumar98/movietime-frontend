import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import SignupPage from './SignupPage';
import MovieList from './MovieList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/" element = {<LoginPage/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/addMovie" element = {<AddMovie/>}/>
        <Route path ="/signUp" element = {<SignupPage/>}/>
        <Route path="/movieList" element={<MovieList/>}/>
        <Route path="/editMovie/:movieId" element={<EditMovie />} />

      </Routes>
    </Router>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
