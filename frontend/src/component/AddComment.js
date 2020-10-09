import React, {useState} from "react";

const AddComment = ({articleName, setArticleInfo}) => {

    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')

    const addComment = async () => {
        console.log(JSON.stringify({username, text: {comment:comment}}))

            const result = await fetch(
                `/api/articles/${articleName}/add-comment`,
                {
                    method: 'post',
                    body: JSON.stringify({username, text: comment}),
                    headers: {
                        'Content-Type': 'application/json'
                    }   
                }
            )
        try {
            const body = await result.json()
            setArticleInfo(body)
            setComment('')
            setUsername('')

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'add-comment-form'}>
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input value={username} type="text" onChange={event => setUsername(event.target.value)}/>
            </label><br/>
            <label>
                Comment:
            </label>
            <textarea value={comment} rows="4" cols="50" onChange={event => setComment(event.target.value)}/>
            <button onClick={ () => addComment()}>Add Comment</button>
        </div>
    )
}

export default AddComment