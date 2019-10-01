const express = require("express");

const Posts = require('../data/db');

const router = express.Router();

router.get("/", (req, res) => {
 if(!Posts) {
     res.status(500).json({error: 'get request failed'})
 } else {
     Posts.find().then(posts => {
         res.send(posts)
     })
     .catch(error => {
         console.log(error)
     })
 }
});

router.post("/", (req, res) => {
  Posts.insert(req.body);
  const postData = req.body;

  if (!postData.title || !postData.contents) {
    res.status(400).json({ message: "please provide title and contents" });
  } else {
    Posts
    .insert(postData)
    .status(201).json({message: "post created"})
    .then(post => {
      res.status(201).json(post);
    }).catch(error => {
      console.log(error);
    });
  }
});

module.exports = router;
