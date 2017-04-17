

var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/database-config');
var google = require('googleapis');
var civicInfo = require("civic-info")({apiKey: 'AIzaSyDmMib1-iMC4PwQZcnsKUa4vnB00l0sAfU'});
var config = {
  database: 'psp_database',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//end of config

var user = {};
var voterInfo = {};

//pool / pg constructor function
var pool = new pg.Pool(config);

//adds new idea to DB
router.post('/newidea', function (req, res) {
  var newIdea = req.body;
  console.log('newIdea: ', newIdea);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO ideas (title, description, subtopics_id, users_id) VALUES ($1, $2, $3, $4)',
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

router.post('/newUser', function (req, res) {
 var newUser = req.body;
 // console.log('newUser: ', newUser.address);
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
     client.query('INSERT INTO users (name, address, email, ward, photo) VALUES ($1, $2, $3, $4, $5)',
       [newUser.name, newUser.address, newUser.email, newUser.ward, newUser.photo])
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

//adds new sub-comment to DB
router.post('/addNewSubComment', function (req, res) {
  var newSubComment = req.body;
  console.log('newSubComment: ', newSubComment);
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


// //adds new user to DB
// router.post('/newUser', function (req, res) {
//   var newUser = req.body;
//   console.log('newUser: ', newUser);
//   pool.connect()
//     .then(function (client) {
//       client.query('INSERT INTO users (name, email, address, admin) VALUES ($1, $2, $3, $4)',
//         [newUser.name, newUser.email, newUser.address, newUser.admin])
//         .then(function (result) {
//           client.release();
//           res.sendStatus(201);
//         })
//         .catch(function (err) {
//           console.log('error on INSERT', err);
//           res.sendStatus(500);
//         });
//     });//end of .then
// });//end of router.post


// router.get('/users', function(req, res){
//   console.log('hit  router');
//   // This will be replaced with a SELECT statement to SQL
//   pool.connect(function(errorConnectingToDatabase, client, done){
//     if(errorConnectingToDatabase) {
//       // There was an error connecting to the database
//       console.log('Error connecting to database: ', errorConnectingToDatabase);
//       res.sendStatus(500);
//     } else {
//       // We connected to the database!!!
//       // Now, we're gonna' git stuff!!!!!
//       client.query('SELECT * FROM "users";', function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery) {
//           console.log('Error making the database query: ', errorMakingQuery);
//           res.sendStatus(500);
//         } else {
//           // res.send(result.rows);
//
//           var userData = result.rows;
//           // console.log('userData',userData[1].address);
//           user.address = userData[4].address;
//
//           civicInfo.voterInfo(
//             { address:newUser.address},function callback (error, data) {
//               console.log('here');
//               console.log("error",error);
//               console.log("++++++++++++++++++data",
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:1"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:2"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:3"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:4"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:5"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:6"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:7"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:8"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:9"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:10"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:11"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:12"],
//               data.divisions["ocd-division/country:us/state:mn/place:minneapolis/ward:13"]
//             );
//             for (var i = 0; i < 14; i++) {
//               array[i]
//             }
//             for each thing in data.divisions
//             if(currentThing is defined) done
//             thing["ocd-division/country:us/state:mn/place:minneapolis/ward:" + i]
//
//           });
//         }
//       });
//     }
//   });
// });




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
