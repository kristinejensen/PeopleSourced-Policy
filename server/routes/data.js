var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
//NEEDS TO BE PROTECTED BY AUTH
//**********************************************//
//                                              //
//               ADMIN REPORTS VIEW             //
//                                              //
//**********************************************//
//Finds the number of users in a ward to display on admin view.
router.get('/userChart', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
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

//gets all users name and id for idea and comment view
router.get('/ideaChart', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
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

//WHAT IS THIS?
//*****************************************//
//          GETS USER NAME AND ID          //
//*****************************************//
//gets all users name and id for idea and comment view
router.get('/getUserNameId', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, name FROM users")
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


module.exports = router;
