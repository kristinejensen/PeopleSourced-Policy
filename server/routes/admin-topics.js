var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//*******************//
//                   //
//    MAIN TOPIC     //
//                   //
//*******************//

router.get('/findActiveTopic', function(req, res){
  var title = req.headers.title
  var description = req.headers.description;
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error finding main topic from the database.', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

router.put('/updateActiveTopic', function(req, res){
  console.log('admin-topics route hit');
  var mainTopic = {title: req.body.title, description: req.body.description, id: req.body.id};
  pool.connect( function (err, client, done) {
    client.query('UPDATE main_topics SET title = $1, description = $2 WHERE id = $3;',
    [mainTopic.title, mainTopic.description, mainTopic.id], function(err, result){
      done();
      if(err){
        console.log('Error updating main topic', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});

//*******************//
//                   //
//    SUB TOPICS     //
//                   //
//*******************//

router.get('/findActiveSubTopics', function(req, res){
  pool.connect( function (err, client, done) {
    //First find the active Topic, then find all subTopics that are a part of this main topic.
    //This acts as one extra layer of security, I could consider removing it.
    client.query('SELECT id FROM main_topics WHERE active = true;', function(err, result){
      done();
      if(err){
        console.log('Error finding an active Main Topic for Subtopic Query', err);
        res.sendStatus(500);
      } else {
        activeMainTopicID = result.rows[0].id;
        pool.connect(function(err, client, done){
          //Limit Query to 5 as an extra layer of security to ensure the site styling doesn't break.
          client.query('SELECT * FROM subtopics WHERE main_id = $1 AND active = true ORDER BY id ASC LIMIT 5;',
          [activeMainTopicID], function(err, result){
            done();
            if(err){
              console.log('Error finding all active subtopics', err);
              res.sendStatus(500);
            } else {
              res.send(result.rows);
            }
          })
        })
      }
    });
  });
});

router.put('/updateActiveSubTopics', function(req, res) {
  var subtopic = {title: req.body.title, description: req.body.description, id: req.body.id};
  pool.connect( function (err, client, done) {
    client.query('UPDATE subtopics SET title = $1, description = $2 WHERE id=$3;',
    [subtopic.title, subtopic.description, subtopic.id], function(err, result){
      done();
      if(err){
        console.log('Error deactivating user', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
});

module.exports = router;
