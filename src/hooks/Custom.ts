import { useMemo, useState, useEffect } from "react";


/**
 * WebSocket の Event をStateとして取り出す
 * 
 * 返却のWebSocketはURLが変わった場合のみ再生成する
 * 
 * @param url WebSocketの接続先
 * @returns WebSocket の Event, WebSocket
 */
export function useWebSocketEvent(url: string): [Event, WebSocket] {
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
    }, [ws])
    return [eventState, ws]
}

