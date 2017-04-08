var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

router.get('/manageUsers', function(req, res){
  console.log('manage users route hit');
  // var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM users', function(err, result){
      done();
      if(err){
        ('Error manage users query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});


module.exports = router;
