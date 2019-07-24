import React, { useState, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [str, setStrState] = useState("a");
  const [list, setListState] = useState<string[]>([]);
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
        const s = (inputRef.current && inputRef.current.value) || ""
        setStrState(s)
        setListState([...list, s])
      }}>set</button>
      {list.map(v => <div>{v}</div>)}
    </div>
  );
}

export default App;
