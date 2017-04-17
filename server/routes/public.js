var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//*****************************************//
//               MAIN TOPIC                //
//*****************************************//

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
      }
    });
  });
});

router.get('/findSpecificSubTopic/', function(req, res){
  console.log('where is the id? :', req.headers);
  var subtopicId = 1;
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM subtopics WHERE id = $1;',
    [subtopicId],function(err, result){
      done();
      if(err){
        console.log('Error finding main topic from the database.', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

module.exports = router;
