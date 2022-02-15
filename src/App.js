// import logo from './logo.svg';
import './App.css';
import Todo from './Todo'
import Three from './Three'

import React from 'react';

// Todo: css resizing between todo component and three component
// Todo: css styling in todo component
// Todo: active visualization of number of todos in three component

function App() {
  return (
    <div className="App">
      <Todo/>
      <Three/>
    </div>
  );
}

export default App;