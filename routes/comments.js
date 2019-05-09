const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");


router.post("/comments", (req, res) => {
  const {content, issueId} = req.body
  const user = req.user._id
 Comment.create({content, user})
  .then(comment => {
    res.json(comment)
   Issue.findOneAndUpdate({_id: issueId}, 
     { $push: { comments: comment._id }})
     .then(()=>console.log('added'))
     .catch(error => {
           res.json(error);
         });
     })
   })

   router.get("/comments/:id", (req, res) => {

    // find the issue by id



    Comment.findById({issue:req.params.id})
      .then(comment => {
        res.json(comment);
      })
      .catch(error => {
        res.json(error);
      });
  });
module.exports = router
