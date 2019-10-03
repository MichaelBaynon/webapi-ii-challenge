require('dotenv').config()

const express = require('express')

const port = process.env.PORT

const Posts = require('./data/db')
const postsRouter = require('./posts/posts-router')

const server = express()
server.use(express.json())

server.use('/api/posts', postsRouter)

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id

    Posts.findById(id)
    .then(posts => {
        res.send(posts)
    })
    .catch(error => {
        res.status(500)
        .json({message: 'the post by id could not be retrieved'})
    })
})

server.post('/api/posts/:id/comments', (req, res) => {
const id = req.params.id
const postData = req.body

Posts.insert(postData)
.then(post => {
    res.json(post)
})
.catch(error => {
    res.status(500).json({error: 'post did not work'})
})

}) 

server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id

    Posts.findCommentById(id)
    
    .then(posts => {
        res.send(posts)
    })
    .catch(error => {
        res.status(500).json({error: 'The post comment information could not be retrieved'})
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    const postData = req.body;

    Posts.remove(id)
    .then(post => {
        res.json(post)
    })
    .catch(error => {
        res.status(500).json({message: 'user could not be removed'})
    })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    const postData = req.body

    Posts.update(id, changes)
    .then(post => {
        res.json(post)
    })
    .catch(error => {
        res.json({message: 'post info could not be modified'})
    })
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})