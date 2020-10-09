import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./NavBar";
import Dimension404 from "./pages/Dimension404";


function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <div id="page-body">
                <Switch>
                    <Route path={"/"} component={HomePage} exact/>
                    <Route path={"/about"} component={AboutPage}/>
                    <Route path={"/article-list"} component={ArticlesPage}/>
                    <Route path={"/article/:name"} component={ArticlePage}/>
                    <Route component={Dimension404}/>
                </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
