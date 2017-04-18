var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//gets all users name and id for idea and comment view
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

//gets all subtopics for add idea view
router.get('/getSubTopics', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM subtopics")
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

router.get('/subtopicIdeas', function(req, res){
  var subtopicId = req.headers.id;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM ideas FULL OUTER JOIN users ON ideas.user_id = users.id WHERE subtopics_id=$1;',
    [subtopicId], function(err, result){
      done();
      if(err){
        ('Error completing user tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
        console.log(result.rows);
      }
    });
  });
});



router.get('/comments', function(req, res){
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM comments JOIN idea ON idea.id=comments.idea_id WHERE email=$1;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get comments on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets all coments for comment view
router.get('/allComments', function (req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM comments")
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

router.get('/idea', function(req, res){
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM idea;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get causes on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

// gets total number of app users to display on home page
router.get('/userTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT COUNT (*) FROM users;', function(err, result){
      done();
      if(err){
        ('Error completing user tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

//gets total number of ideas shared on app to display on home page
router.get('/ideasTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT COUNT (*) FROM ideas;', function(err, result){
      done();
      if(err){
        ('Error completing ideas tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  });
});

//gets total number of comments shared on app to display on home page
router.get('/commentsTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM comments) + (SELECT COUNT(*) FROM subcomments) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing comments tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets total number of likes on app to display on home page
router.get('/likesTally', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT (SELECT COUNT(*) FROM sublikes) + (SELECT COUNT(*) FROM ideas_likes) + (SELECT COUNT(*) FROM comments_likes) AS SumCount;', function(err, result){
      done();
      if(err){
        ('Error completing likes tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets total number of likes on app to display on home page
router.get('/getLikes', function(req, res){
  pool.connect(function (err, client, done) {
    client.query('SELECT COUNT (*) FROM ideas_likes WHERE idea_id=1;;', function(err, result){
      done();
      if(err){
        ('Error completing likes tally query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets total number of likes on app to display on home page
router.post('/addLike/:id', function(req, res){
  var ideaLikedId = req.params.id;
  console.log(ideaLikedId);
  // pool.connect(function (err, client, done) {
  //   client.query('SELECT COUNT (*) FROM ideas_likes WHERE idea_id=1;;', function(err, result){
  //     done();
  //     if(err){
  //       ('Error completing likes tally query', err);
  //       res.sendStatus(500);
  //     } else {
  //       res.send(result.rows[0]);
  //       console.log(result.rows[0]);
  //     }
  //   });
  // });
});

module.exports = router;
