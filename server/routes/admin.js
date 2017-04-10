var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');
var config = {
  database: 'solo',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

//pool / pg constructor function
var pool = new pg.Pool(config);



//request to get all users for manage users admin view
router.get('/manageUsers', function(req, res){
  console.log('manage users route hit');
  // var userEmail = req.decodedToken.email;
  pg.connect(connectionString, function (err, client, done) {
    client.query('SELECT * FROM users;', function(err, result){
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


//request to delete user from manage users admin view
router.delete('/deleteUser/:id', function(req, res) {
  var userId = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', userId);

  // db query
  // DELETE FROM task WHERE id=7
router.delete('/deleteUser/:id', function(req, res) {
  var userId = req.params.id;
  pool.connect()
    .then(function (client) {
      client.query('DELETE FROM users WHERE id=$1:',
        [userId])
        .then(function (result) {
          client.release();
          res.sendStatus(200);
      })
      .catch(function (err) {
          console.log('error on Delete', err);
          res.sendStatus(500);
      });
  });
});
});


module.exports = router;


//SELECT DISTINCT users.id, name, email, address, ward FROM users JOIN ideas_flags ON ideas_flags.user_id=users.id;
