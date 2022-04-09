import React from 'react';
import logo from './logo.svg';
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (<>
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home signedIn={false}></Home>}/>
        </Routes>
      </Router>
      <Home signedIn={false}></Home>
    </div>
    </>)
    

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
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
}

export default App;