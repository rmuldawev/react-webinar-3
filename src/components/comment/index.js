import React, { useCallback, useState } from "react"
import {cn as bem} from '@bem-react/classname';
import '../comment/styles.css'
import Input from "../input";


const Comment = ({onCommentSubmit}) => {
    const token = localStorage.getItem('token')
    console.log('toker',token)
    const [data,setData] = useState('')
    console.log('data',data)

    

    const cn = bem('Comment');

    const onChange = useCallback((value) => {
        setData(value);
      }, [])

      const handleCommentSubmit = useCallback(() => {
        onCommentSubmit({ text: data });
      }, [data, onCommentSubmit]);
    return (
        <div className={cn('container')}>
            <p className={cn('title')}>Новый комментарий</p>
            <Input value={data} theme={'field'} name={"comment"} onChange={onChange}/>
            <button className={cn('button')}onClick={handleCommentSubmit} >Отправить</button>

        </div>
    )
}

export default React.memo(Comment)