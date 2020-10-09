import React from "react";

const Comments = ({comments}) =>
    <>
        <h1> Comments </h1>
        {comments.map((comment, key) => (
            <div className={'comment'} key={key}>
                <h4>{comment.username}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </>

export default Comments