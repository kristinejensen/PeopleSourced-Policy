var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//*****************************************//
//              ADDING IDEAS             //
//*****************************************//

//adds new idea to DB
router.post('/newidea', function (req, res) {
  if(req.decodedToken.userSQLId) {
  var newIdea = req.body;
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description, subtopics_id, user_id) VALUES ($1, $2, $3, $4)',
        [newIdea.title, newIdea.description, newIdea.subtopicId, req.decodedToken.userSQLId])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
  }
});//end of router.post

//*****************************************//
//               COMMENTING                //
//*****************************************//

//adds comments to DB
router.post('/addComment', function (req, res) {
  if(req.decodedToken.userSQLId) {
  var newComment = req.body;
  // console.log('newComment: ', newComment);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO comments (description, idea_id, user_id) VALUES ($1, $2, $3)',
        [newComment.description, newComment.idea_id, req.decodedToken.userSQLId ])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
  }
  });//end of router.post


//adds new sub-comment to DB
router.post('/addNewSubcomment', function (req, res) {
  if(req.decodedToken.userSQLId) {
  var newSubComment = req.body;
  var token = req.params; //this is were im stuck!!
  // console.log('token: ', token);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO subcomments (description, user_id, comment_id) VALUES ($1, $2, $3)',
        [newSubComment.description, newSubComment.user_id, newSubComment.comment_id])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
  }
});//end of router.post

module.exports = router;
