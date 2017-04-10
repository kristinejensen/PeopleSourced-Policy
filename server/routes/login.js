var express = require('express');
var router = express.Router();
var pg = require('pg');
// var connectionString = require('../modules/database-config');
var config = {
  database: 'psp_database',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//end of config

//pool / pg constructor function
var pool = new pg.Pool(config);

//adds new user to DB
router.post('/newUser', function (req, res) {
  var newUser = req.body;
  console.log('newUser: ', newUser);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO users (name, street, city, state, zipCode, country, email) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [newUser.name, newUser.street, newUser.city, newUser.state, newUser.zipCode, newUser.country, newUser.email])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds new idea to DB
router.post('/newidea', function (req, res) {
  var newIdea = req.body;
  console.log('newIdea: ', newIdea);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description) VALUES ($1, $2)',
        [newIdea.idea, newIdea.description])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds liked to DB
router.post('/addLiked', function (req, res) {
  var addLiked = req.body;
  console.log('addLiked: ', addLiked);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas_likes (user_id, idea_id) VALUES ($1, $2)',
        [addLiked.idea, newIdea.subtopics_id])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds loved to DB
router.post('/addLoved', function (req, res) {
  var addLoved = req.body;
  console.log('addLoved: ', addLoved);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description) VALUES ($1, $2)',
        [newIdea.idea, newIdea.description])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds flagged to DB
router.post('/addFlag', function (req, res) {
  var addFlag = req.body;
  console.log('addFlag: ', addFlag);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description) VALUES ($1, $2)',
        [newIdea.idea, newIdea.description])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post

//adds comments to DB
router.post('/addComment', function (req, res) {
  var newComment = req.body;
  console.log('newComment: ', newComment);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO comments (description, idea_id, user_id) VALUES ($1, $2, $3)',
        [newComment.description, newComment.idea_id, newComment.user_id])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post








// //check auth user to admin rights
//   router.get("/admin", function(req, res){
//     pg.connect(connectionString, function(err, client, done){
//       var userEmail = req.decodedToken.email;
//       // Check the user's level of permision based on their email
//       client.query('SELECT admin FROM users WHERE email=$1', [userEmail], function(err, clearanceLevelQueryResult){
//         done();
//         if(err){
//           console.log('Error COMPLETING clearance_level query task', err);
//           res.sendStatus(500);
//         }else{
//           pg.connect(connectionString, function(err, client, done){
//             if(clearanceLevelQueryResult.rowCount === 0) {
//               // If the user is not in the database, return a forbidden error status
//               console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
//               res.sendStatus(403);
//             } else {
//               var clearanceLevel = clearanceLevelQueryResult.rows[0].clearance_level;
//               // Based on the clearance level of the individual, give them access to different information
//               client.query('SELECT * FROM users WHERE admin=="true"', [admin], function(err, results){
//                 if(err){
//                   console.log('Error COMPLETING secret_information query task', error);
//                   res.sendStatus(500);
//                 }else{
//                   // return all of the results where a specific user has permission
//                   res.send(results.rows);
//                   console.log(results.rows);
//                 }
//               });//end of client.query()
//             }
//           // done();
//         });//end of pg.connect()
//         }
//       });//end of client.query()
//     });//end of pg.connect()
//   });//end of router.get()






module.exports = router;
