import React, { useReducer, Dispatch } from 'react';
import Counter from './contents/Counter';
import Posts from './contents/Posts';
import Chat from './contents/Chat';


type MenuState = {
    content: React.FC
}
type MenuAction = {
    menu: string
}
export function menuReducer(state: MenuState, action: MenuAction): MenuState {
    switch (action.menu) {
        case "counter":
            return { content: Counter }
        case "posts":
            return { content: Posts }
        case "chat":
            return { content: Chat }
        default:
            return { content: () => { return <div>hello3</div> } }
    }
}

export function initContent(): MenuState {
    return { content: () => { return <div>init hello</div> } }
}

const SideMenu = (props: { dispatch: React.Dispatch<MenuAction> }) => {
    return <nav className="SideMenu">
        <h1>side menu</h1>
        <ul>
            <li>
                <button onClick={() => props.dispatch({ menu: "counter" })}>counter</button>
            </li>
            <li>
                <button onClick={() => props.dispatch({ menu: "posts" })}>posts</button>
            </li>
            <li>
                <button onClick={() => props.dispatch({ menu: "chat" })}>chat</button>
            </li>
            <li>
                <button onClick={() => props.dispatch({ menu: "a" })}>sample1</button>
            </li>
        </ul>
    </nav>
}

export default SideMenu;