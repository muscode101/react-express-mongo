import React from "react";
import articleContent from "./article-content";
import ArticlesList from "../component/ArticlesList";

const ArticlesPage = () =>
    <>
        <ArticlesList articles={articleContent}/>
    </>

export default ArticlesPage