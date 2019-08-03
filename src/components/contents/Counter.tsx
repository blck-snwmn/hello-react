import React, { useReducer } from 'react';

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

export default Counter