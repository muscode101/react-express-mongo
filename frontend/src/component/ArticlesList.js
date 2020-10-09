import React from "react";
import {Link} from "react-router-dom"

const ArticlesList = ({articles}) =>
    <>
        <h1> List of articles </h1>
        {articles.map(article =>(
            <Link to={`/article/${article.name}`}>
                <h1>{article.title}</h1>
                <p>{article.content[0].substr(150)}..</p>
            </Link>
        ))}
    </>

export default ArticlesList