import React from 'react';
import logo from './logo.svg';
import Home from './Home'
import Chat from './Chat'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GAuthProvider } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import FirstTime from './FirstTime';
import WaitingRoom from './WaitingRoom';
import AVRoom from './AVRoom';
import AVRoomPeer from './AVRoomPeer';

function App() {
  return (<>
    <div id="App">
      <Router>
        <GAuthProvider>
          <DatabaseProvider>
        <Routes>
          <Route path="/" element={<Home signedIn={false}></Home>}/>
          <Route path="/first-time" element={<FirstTime></FirstTime>}/>
          <Route path="/waiting-room" element={<WaitingRoom></WaitingRoom>}/>
          <Route path="/avroom" element={<AVRoom></AVRoom>}/>
          <Route path="/avroompeer" element={<AVRoomPeer></AVRoomPeer>}/>
          <Route path="/chat" element={<Chat></Chat>}/>
        </Routes>
        </DatabaseProvider>
        </GAuthProvider>
      </Router>
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
