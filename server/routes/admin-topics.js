var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');


router.get('/findActiveTopic', function(req, res){
  console.log('FIND admin-topics route hit');
  var title = req.headers.title
  var description = req.headers.description;
  console.log(title, description);
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing find active topic query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }//ends else
    });//ends client.query
  });//ends pool.connect
});//ends router.get


router.put('/updateActiveTopic', function(req, res){
  console.log('admin-topics route hit');
  var title = req.headers.title
  var description = req.headers.description;
  // var userEmail = req.decodedToken.email;
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing find active topic query', err);
        res.sendStatus(500);
      } else {
        //If an active topic exists, update it.
        if (result.rows[0] !== undefined){
          var activeTopicId = result.rows[0].id;
          console.log('Active Topic ID: ', result.rows[0].id);
          client.query('UPDATE main_topics SET title = $1, description = $2 WHERE id = $3;',
          [title, description ,activeTopicId], function(err, result){
            done();
            if(err){
              console.log('Error updating topic', err);
              res.sendStatus(500);
            } else {
              res.send(result.rows);
              console.log(result.rows);
            }
          });
          //if an active topic does not exist,
        } else {
          res.send('There is no current Topic.');
          console.log('There is no current Topic.');
        }//ends else
      }//ends else
    });//ends client.query
  });//ends pool.connect
});//ends router.get

module.exports = router;
