import React, { useState, useRef } from 'react';
import { useWebSocketEvent } from '../../hooks/Custom'

function show(event: Event): string {
    let message = ""
    switch (event.type) {
        case "open":
            message = "open"
            break;
        case "message":
            const me = event as MessageEvent
            message = me.data
            break;
        case "error":
            message = "error!"
            break;
        case "close":
            const ce = event as CloseEvent
            message = "close"
            break;
        default:
            break;
    }
    console.log("show", message)
    return message
}

const UrlChanger = (props: {
    eventState: Event,
    setUrlState: (v: React.SetStateAction<string>) => void
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <div>
                <input id="input" type="text" ref={inputRef} />
                <button onClick={() => {
                    if (inputRef.current) {
                        props.setUrlState(inputRef.current.value)
                    }
                }}>connect</button>
            </div>
            <div>
                Event: {show(props.eventState)}
            </div>
        </div>
    )
}
const Chat = () => {
    console.log("chat")

    const urlBase = "ws://localhost:18888/websocket/"
    const [urlState, setUrlState] = useState("send")
    const url = urlBase + urlState

    const [eventState, ws] = useWebSocketEvent(url)
    return (
        <div>
            <UrlChanger eventState={eventState} setUrlState={setUrlState} />
        </div >
    )
}

export default Chat
