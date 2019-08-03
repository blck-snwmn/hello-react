import React, { useState, useRef } from 'react';

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

const Posts = () => {
    const [str, setStrState] = useState("a");
    const [list, setListState] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div>
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
                setStrState(s)
                setListState([...list, s])
            }}>post</button>
            <ol>
                {list.map((v, i) => <Post count={i} userName="no-name" content={v}></Post>)}
            </ol>
        </div>
    )
}

export default Posts