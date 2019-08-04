import React, { useState, useRef, useEffect, useMemo } from 'react';

/**
 * WebSocket の Event をStateとして取り出す
 * 
 * 返却のWebSocketはURLが変わった場合のみ再生成する
 * 
 * @param url WebSocketの接続先
 * @returns WebSocket の Event, WebSocket
 */
function useWebSocketEvent(url: string): [Event, WebSocket] {
    /**
    * setEventStateを呼ぶたびに, この関数が実行される.
    * (Eventのインスタンスは同じにならない)
    * urlが変わらない限り再度websocketを作る必要がないため, memo化
    * useMemo, useEffectともにurlの変更で動作するのが, とりあえず分けたまま
    * 
    * また, websocketの再接続処理は行わない
    */
    const [eventState, setEventState] = useState(new Event("init"))

    const ws = useMemo(() => new WebSocket(url), [url])
    useEffect(() => {
        console.log("effect")
        ws.onmessage = (event: MessageEvent) => {
            console.log("yes", event)
            setEventState(event)
        }
        ws.onerror = (event: Event) => {
            console.log("error", event)
            setEventState(event)
        }
        ws.onopen = (event: Event) => {
            console.log("open", event)
            setEventState(event)
        }
        // CloseEvent extends Event
        ws.onclose = (event: CloseEvent) => {
            console.log("close", event)
            setEventState(event)
        }
        return () => { ws.close() }
    }, [url])
    return [eventState, ws]
}

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

const Chat = () => {
    console.log("chat")

    const urlBase = "ws://localhost:18888/websocket/"
    const [urlState, setUrlState] = useState("send")
    const url = urlBase + urlState

    const [eventState, ws] = useWebSocketEvent(url)

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <div>
                <input id="input" type="text" ref={inputRef} />
                <button onClick={() => {
                    if (inputRef.current) {
                        setUrlState(inputRef.current.value)
                    }
                }}>connect</button>
            </div>
            <div>
                Event: {show(eventState)}
            </div>
        </div>
    )
}

export default Chat
