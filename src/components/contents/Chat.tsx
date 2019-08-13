import React, { useState, useRef, useEffect } from 'react';
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
const ShowMessgae = (props: {
    eventState: Event
}) => {
    const [eventsState, setEventsState] = useState<Event[]>([])
    useEffect(() => {
        setEventsState(old => [...old, props.eventState])
    }, [props.eventState])
    return (
        <ol>
            {
                eventsState.map(e => {
                    return (
                        < li key={e.timeStamp} >
                            {show(e)}
                        </li>
                    )
                })
            }
        </ol>
    )
}
const SendMessage = (props: {
    webSocket: WebSocket
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => {
                if (inputRef.current) {
                    // 非同期で投げるほうがよいかも
                    // 要検証
                    props.webSocket.send(inputRef.current.value)
                }
            }} >
                send
            </button>
        </div>
    )
}
const UrlChanger = (props: {
    eventState: Event,
    setUrlState: (v: React.SetStateAction<string>) => void
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <div>
                <input id="input" type="text" ref={inputRef} defaultValue="noname" />
                <button onClick={() => {
                    if (inputRef.current) {
                        props.setUrlState(inputRef.current.value)
                    }
                }}>connect</button>
            </div>
            <div>
                Room Name: {inputRef.current ? inputRef.current.value : "noname"}
            </div>
        </div>
    )
}

const Chat = () => {
    console.log("chat")

    const urlBase = "ws://localhost:28888/ws/"
    const [urlState, setUrlState] = useState("noname")
    const url = urlBase + urlState

    const [eventState, ws] = useWebSocketEvent(url)

    return (
        <div>
            <UrlChanger eventState={eventState} setUrlState={setUrlState} />
            <SendMessage webSocket={ws} />
            <ShowMessgae eventState={eventState} />
        </div >
    )
}

export default Chat
