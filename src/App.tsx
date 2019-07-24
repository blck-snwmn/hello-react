import React, { useState, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [str, setStrState] = useState("a");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="App">
      <div>
        <label htmlFor="input">入力</label>
        <input id="input" type="text" ref={inputRef} />
      </div>
      <div>
        <label htmlFor="show">表示</label>
        <input id="show" type="text" value={str} />
      </div>
      <button onClick={() => {
        const s = inputRef.current && inputRef.current.value
        setStrState(s || "")
      }}>set</button>
    </div>
  );
}

export default App;
