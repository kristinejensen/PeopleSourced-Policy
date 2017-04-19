var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
//NEEDS TO BE PROTECTED BY AUTH


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
