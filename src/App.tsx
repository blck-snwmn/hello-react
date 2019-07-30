import React, { useState, useRef, useReducer } from 'react';
import './App.css';

type PostProps = {
  count: number;
  userName: string;
  content: string;
}
const Post = (props: PostProps) => {
  //時刻は投稿されるたびに更新されるが、一旦これでOKとする
  return <ol key={props.count}>
    <label><span>{props.count}</span>:{props.userName}:{new Date().toISOString()}</label>
    <div>{props.content}</div>
  </ol>
}

type ReducerState = {
  message: string
}

type ReducerAction = {
  con: string
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.con) {
    case "a":
      return { message: state.message + "a" }
    case "b":
      return { message: state.message + "b" }
    default:
      return { message: "c" }
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { message: "a" })
  return (
    <div>
      Message:{state.message}
      <div>
        <button onClick={() => dispatch({ con: "a" })}>add a</button>
        <button onClick={() => dispatch({ con: "b" })}>add b</button>
        <button onClick={() => dispatch({ con: "c" })}>change c</button>
      </div>
    </div >
  )
}

const WebSocketWrap = () => {
  const ws = new WebSocket("ws://localhost:18888/websocket/send");
  // MessageEvent extends Event
  ws.onmessage = (event: MessageEvent) => {
    console.log("yes", event)
  }
  ws.onerror = (event: Event) => {
    console.log("error", event)
  }
  ws.onopen = (event: Event) => {
    console.log("open", event)
  }
  // CloseEvent extends Event
  ws.onclose = (event: CloseEvent) => {
    console.log("close", event)
  }
  return ws;
}

const App: React.FC = () => {
  const [str, setStrState] = useState("a");
  const [list, setListState] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // const ws = useRef(new WebSocket("ws://localhost:18888/websocket"));
  const ws = WebSocketWrap()
  return (
    <div className="App">
      <Counter />
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
        // setStrState(s)
        setListState([...list, s])
        ws.send(s)
      }}>post</button>
      <ol>
        {list.map((v, i) => <Post count={i} userName="no-name" content={v}></Post>)}
      </ol>
    </div>
  );
}

export default App;
