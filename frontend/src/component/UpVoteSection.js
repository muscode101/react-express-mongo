import React from "react";

const UpVoteSection = ({articleName, setArticleInfo, upvotes}) => {
    const upVoteArticle = async () => {
        const result = await fetch(
            `/api/articles/${articleName}/upvote`,
            {method: 'post'}
        )
        const body = await result.json()
        setArticleInfo(body)
    }

    if (upvotes) {
        return (
            <div className={'upvotes-section'}>
                <button onClick={async () => upVoteArticle()}>upVote</button>
                <p>this article has been upvotes {upvotes} times</p>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default UpVoteSection