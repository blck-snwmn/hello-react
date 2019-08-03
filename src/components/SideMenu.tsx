import React, { useReducer, Dispatch } from 'react';


type MenuState = {
    content: React.FC
}
type MenuAction = {
    menu: string
}
export function MenuReducer(state: MenuState, action: MenuAction): MenuState {
    switch (action.menu) {
        case "count":
            return { content: () => { return <div>hello1</div> } }
        case "count2":
            return { content: () => { return <div>hello2</div> } }
        default:
            return { content: () => { return <div>hello3</div> } }
    }
}

const SideMenu = (props: {dispatch: React.Dispatch<MenuAction>}) => {
    return <nav className="SideMenu">
    <h1>side menu</h1>
    <ul>
      <li><button onClick={() => props.dispatch({ menu: "count" })}>sample1</button></li>
      <li><button  onClick={() => props.dispatch({ menu: "count2" })}>sample1</button></li>
      <li><button  onClick={() => props.dispatch({ menu: "a" })}>sample1</button></li>
    </ul>
  </nav>
}

export default SideMenu;