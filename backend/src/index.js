import express from 'express'
import bodyParser from 'body-parser'
import Mongodb from 'mongodb'

const {MongoClient} = Mongodb
const app = express()
const PORT = 6000

const url = 'mongodb://localhost:27017/'
let collection = null

app.use(bodyParser.json())

app.get('/', (req, res) => {
    collection.find({})
        .toArray((error, articles) => {
            if (!error) {
                res.status(200).json(articles)
            } else {
                res.status(500).send("error get data", error)
                console.log(error)
            }
        })
})

app.get('/api/articles/:name', (req, res) => {
    const articleName = req.params.name
    collection.findOne({name: articleName}, (error, article) => {
        if (error) {
            res.status(500)
            console.log(error)
        }
        res.status(200).json(article)
        console.log(article)
    })
})

app.post('/api/articles/:name/upvote', (req, res) => {
    let articleName = req.params.name

    collection.findOne({name: articleName}, (error, article) => {
        collection.updateOne({name: articleName},
            {$set: {upvotes: article.upvotes + 1}}, (error, result) => {
                error ? console.log(error) :
                    collection.findOne({name: articleName}, (error, article) => {
                        error ? console.log(error) :
                            console.log(article)
                        res.status(200).json(article)
                    })
            })
    })
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    let articleName = req.params.name
    let {username, text} = req.body

    collection.updateOne({name: articleName},
        {$addToSet: {comments: {username, text}}}, (error, result) => {
            collection.findOne({name: articleName}, (error, updatedArticle) => {
                res.status(200).json(updatedArticle)
            })
        })

})

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function (client) {
        console.log("connected correctly to server")
        const db = client.db('blog')
        collection = db.collection('articles')
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }).catch(function (error) {
    console.log(error)
})