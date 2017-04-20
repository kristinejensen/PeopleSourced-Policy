
var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
var google = require('googleapis');
var civicInfo = require("civic-info")({apiKey: 'AIzaSyDmMib1-iMC4PwQZcnsKUa4vnB00l0sAfU'});

var voterInfo={};
var user = {};


// var config = {
//   database: 'psp_database',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };//end of config
//
// //pool / pg constructor function
// var pool = new pg.Pool(config);

//*****************************************//
//           PREVIOUS USER LGOIN           //
//*****************************************//

//Finds the id of the current user based on the token from firebase.
router.get('/getUserMatch', function (req, res) {
  console.log('get user match route');
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, email FROM users WHERE id = $1", [req.decodedToken.userSQLId])
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//*****************************************//
//              NEW USER LGOIN             //
//*****************************************//

router.post('/newUser', function (req, res) {
 var newUser = req.body;
 console.log('newUser: ', newUser);
 civicInfo.voterInfo(
   { address: newUser.address}, function callback (error, data) {
    //  console.log("error", error);
    //  console.log("++++++++++++++++++data",data);
newUser.ward = "other";
for (var i = 0; i <= 14; i++) {
  // console.log(typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ]);
  if (typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ] !== 'undefined') {
    newUser.ward = "ward " + (i);
  }//end of if
}//end of for loop
 pool.connect()
   .then(function (client) {
     client.query('INSERT INTO users (name, address, city, state, zipcode, email, photo, ward) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
       [newUser.name, newUser.address, newUser.city, newUser.state, newUser.zipCode, newUser.email, newUser.photo, newUser.ward])
       .then(function (result) {
         client.release();
         res.sendStatus(201);
       })
       .catch(function (err) {
         console.log('error on INSERT', err);
         res.sendStatus(500);
       });
    });//end of .then
  });//end of civicinfo
});//end of router.post


// router.post('/newUser', function (req, res) {
//  var newUser = req.body;
//  // console.log('newUser: ', newUser.address);
//  civicInfo.voterInfo(
//    { address: newUser.address}, function callback (error, data) {
//      //  console.log("error", error);
//      //  console.log("++++++++++++++++++data",data);
//      newUser.ward = "other";
//      for (var i = 0; i <= 14; i++) {
//        // console.log(typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ]);
//        if (typeof data.divisions['ocd-division/country:us/state:mn/place:minneapolis/ward:' + i ] !== 'undefined') {
//          newUser.ward = "ward " + (i);
//        }
//      }
//      console.log(newUser);
//      pool.connect()
//      .then(function (client) {
//        client.query('INSERT INTO users (name, address, email, ward, photo) VALUES ($1, $2, $3, $4, $5)',
//        [newUser.name, newUser.address, newUser.email, newUser.ward, newUser.photo])
//        .then(function (result) {
//          client.release();
//          res.sendStatus(201);
//        })
//        .catch(function (err) {
//          console.log('error on INSERT', err);
//          res.sendStatus(500);
//        });
//      });//end of .then
//    });//end of router.post
// });

//*****************************************//
//              ADD A NEW IDEA             //
//*****************************************//

//adds new idea to DB
router.post('/newidea', function (req, res) {
  var newIdea = req.body;
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description, subtopics_id, user_id) VALUES ($1, $2, $3, $4)',
        // [newIdea.title, newIdea.description, newIdea.subtopicId, req.decodedToken.userSQLId])
        [newIdea.title, newIdea.description, newIdea.subtopicId, newIdea.id])
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

//*****************************************//
//              ADD A COMMENT              //
//*****************************************//

//adds comments to DB
router.post('/addComment', function (req, res) {
  var newComment = req.body;
  console.log('newComment: ', newComment);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO comments (description, idea_id, user_id) VALUES ($1, $2, $3)',
        [newComment.description, newComment.idea_id, req.decodedToken.userSQLId])
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


//adds new sub-comment to DB
router.post('/addNewSubcomment', function (req, res) {
  var newSubComment = req.body;
  var token = req.params; //this is were im stuck!!
  console.log('token: ', token);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO subcomments (description) VALUES ($1)',
        [newSubComment.description])
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

module.exports = router;
