import React from 'react';
import './App.css';
import SearchInput from './Components/SearchInput';
import Data from './Data/data.json';

function App() {
  return (
    <div className="App">
      <SearchInput data={Data} placeholder="Search..." />
    </div>
  );
}

export default App;
