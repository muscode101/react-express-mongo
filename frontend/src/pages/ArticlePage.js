import React, {useEffect, useState} from "react";
import articleContent from "./article-content";
import ArticlesList from "../component/ArticlesList";
import Dimension404 from "./Dimension404";
import Comments from "../component/Comments";
import UpVoteSection from "../component/UpVoteSection";
import AddComment from "../component/AddComment";

const ArticlePage = ({match}) => {
    const name = match.params.name
    const article = articleContent.find(article => article.name === name)
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []})
    const otherArticles = articleContent.filter(articles =>
        articles.name !== name
    )
    let upvotes = 0
    let comments = []

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json()
            if (body) {
                setArticleInfo(body)
            }
        }
        fetchData()
    }, [name])

    if (!article) return <Dimension404/>


    return (
        <>
            <h1> {article.title} </h1>
            <UpVoteSection setArticleInfo={setArticleInfo} articleName={name} upvotes={articleInfo.upvotes}/>

            {article.content.map((paragraph, key) => (
                <p key={key}>
                    {paragraph}
                </p>
            ))}

            <Comments comments={articleInfo.comments}/>
            <AddComment setArticleInfo={setArticleInfo} articleName={name}/>
            <h1>Other Articles</h1>
            <ArticlesList articles={otherArticles}/>
        </>
    )
}
export default ArticlePage