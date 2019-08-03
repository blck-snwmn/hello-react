import React, { useReducer } from 'react';
import SideMenu, { menuReducer, initContent } from './components/SideMenu';
import './App.css';

const webSocketWrap = () => {
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
  // const ws = useRef(new WebSocket("ws://localhost:18888/websocket"));
  const ws = webSocketWrap()

  const [menuState, dispatch] = useReducer(menuReducer, {}, initContent)

  return (
    <div className="App">
      <SideMenu dispatch={dispatch} />
      <div className="Contents">
        <menuState.content />
      </div>
    </div>
  );
}

export default App;
