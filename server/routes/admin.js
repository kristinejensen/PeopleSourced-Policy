var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


//request to get all users for manage users admin view
router.get('/manageUsers', function(req, res){
  console.log('manage users route hit');
  // var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT (users.id, name, email, ward) FROM users JOIN ideas_flags ON ideas_flags.user_id=users.id;', function(err, result){
      done();
      if(err){
        ('Error completing manage users query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});


module.exports = router;
