import React, { useReducer } from 'react';
import SideMenu, { menuReducer, initContent } from './components/SideMenu';
import './App.css';

const App: React.FC = () => {
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
