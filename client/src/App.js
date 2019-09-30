import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';

function App(props) {
  return (
    <div className="App">
      <Navbar />
      {props.children}
    </div>
  );
}

export default App;
