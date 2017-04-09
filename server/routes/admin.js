var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');


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
  var userIdToDelete = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', userIdToDelete);

  // db query
  // DELETE FROM task WHERE id=7
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('DELETE FROM task WHERE id=$1;',
        [taskToDeleteId], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(200);
          }
      });
    }
  });
});


module.exports = router;


//SELECT DISTINCT users.id, name, email, address, ward FROM users JOIN ideas_flags ON ideas_flags.user_id=users.id;
