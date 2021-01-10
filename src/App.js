import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const { useState, useEffect } = React;

const fetchRandomData = () => {
  return axios.get('https://randomuser.me/api')
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    fetchRandomData()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {count}
       <button onClick={() => setCount(count+1)}>increment</button>
      </header>
    </div>
  );
}

export default App;
