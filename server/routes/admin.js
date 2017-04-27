
var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//**********************************************//
//                                              //
//               ADMIN REPORTS VIEW             //
//                                              //
//**********************************************//
//Finds the number of users in a ward to display on admin view.
router.get('/userChart', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward ORDER BY ward ASC")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

router.get('/userChartIdeas', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT subtopics_id, count(subtopics_id) FROM ideas GROUP BY subtopics_id ORDER BY subtopics_id ASC;")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

router.get('/checkAdminStatus', function (req, res) {
  console.log('get here?');
  if(req.decodedToken.admin){
    res.send(true);
    console.log('admin', true);
  } else{
    res.send(false);
    console.log('admin', false);
  }
});//end of router.get

//gets all users name and id for idea and comment view
router.get('/ideaChart', function (req, res) {
  if(req.decodedToken.admin){
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
  }
});//end of router.get

//**********************************************//
//                                              //
//              ADMIN MANAGE USERS              //
//                                              //
//**********************************************//
//**********************************************//
//       GET ALL USERS TO DISPLAY ON VIEW       //
//**********************************************//
// router.get('/manageUsers', function(req, res){
//   if(req.decodedToken.admin){
//     pool.connect( function (err, client, done) {
//       client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
//       'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
//       ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
//       'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ideas_flags_count IS NOT NULL OR comments_flags_count IS NOT NULL OR subflags_count IS NOT NULL;', function(err, result){
//         done();
//         if(err){
//           console.log('Error completing manage users query', err);
//           res.sendStatus(500);
//         } else {
//           res.send(result.rows);
//           console.log(result.rows);
//         }
//       });
//     });
//   }
// });

router.get('/manageUsers', function(req, res){
  if(req.decodedToken.admin){
    pool.connect( function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id LIMIT 20;', function(err, result){
        done();
        if(err){
          console.log('Error completing manage users query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//         USER ACTIVATION/DEACTIVATION         //
//**********************************************//
//Deactivate user
router.put('/deactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
    var userToDeactivateId = req.params.id;
    pool.connect( function (err, client, done) {
      client.query('UPDATE users SET active=false WHERE id=$1;',[userToDeactivateId], function(err, result){
        done();
        if(err){
          console.log('Error deactivating user', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});

//Reactivate user
router.put('/reactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
    var userToReactivateId = req.params.id;
    pool.connect(function (err, client, done) {
      client.query('UPDATE users SET active=true WHERE id=$1;',[userToReactivateId], function(err, result){
        done();
        if(err){
          ('Error reactivating user', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//                 USER FILTER                  //
//**********************************************//
//populates user filter on admin manage users view
router.get('/filterUsers', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect(function (err, client, done) {
      client.query('SELECT * FROM user_filter', function (err, result) {
        done();
        if (err) {
          console.log('Error completing user filter query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//        LOGIC FOR WHAT THE FILTER DOES        //
//**********************************************//
//queries database for matching users on admin manage users view
router.get('/searchUsers', function (req, res) {
  if(req.decodedToken.admin){
    var userSearch = req.headers
    var newSearchString = "%" + req.headers.searchstring + "%";
    // console.log(newSearchString);
    if(req.headers.filter == 'User Name'){
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE name ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        });
      });
    } else if(req.headers.filter == 'User Email'){
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE email ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            // console.log(result.rows);
          }
        });
      });
    }else{
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ward ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            // console.log(result.rows);
          }
        });
      });
    }
  }
});

// router.get('/allFlags', function(req, res){
//   console.log("hits all flags");
//   pool.connect( function (err, client, done) {
//     client.query('SELECT * FROM ideas_flags LEFT JOIN ideas ON ideas_flags.idea_id = ideas.id LEFT JOIN users ON users.id = ideas.user_id;', function(err, result){
//       done();
//       if(err){
//         console.log('Error completing manage users query', err);
//         res.sendStatus(501);
//       } else {
//         client.query('SELECT * FROM comments_flags LEFT JOIN comments on comments_flags.comment_id = comments.id LEFT JOIN users ON users.id = comments.user_id;', function(err, result){
//           done();
//           if(err){
//             console.log('Error completing manage users query', err);
//             res.sendStatus(501);
//           } else {
//             res.send(result.rows);
//             console.log("this si RRRRREEESSSULT",result.rows);
//           }
//         });
//       }
//     });
//   });
// });

router.get('/allCommentFlags', function(req,res){
pool.connect( function (err, client, done) {
  client.query('SELECT * FROM comments_flags LEFT JOIN comments on comments_flags.comment_id = comments.id LEFT JOIN users ON users.id = comments.user_id WHERE comments_flags.active = true;', function(err, result){
    done();
    if(err){
      console.log('Error completing manage users query', err);
      res.sendStatus(501);
    } else {
          res.send(result.rows);
          console.log("this si RRRRREEESSSULT",result.rows);
        }
      });
    })
  });

  router.get('/allIdeaFlags', function(req,res){
  pool.connect( function (err, client, done) {
    client.query(' SELECT * FROM ideas_flags LEFT JOIN ideas on ideas_flags.idea_id = ideas.id LEFT JOIN users ON users.id = ideas.user_id WHERE ideas_flags.active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
            res.send(result.rows);
            console.log("this si RRRRREEESSSULT",result.rows);
          }
        });
      })
    });

    router.put('/deleteFlaggedIdeaFlag/:id', function(req,res){
      console.log(req.params.id);
    pool.connect( function (err, client, done) {
      client.query('UPDATE ideas_flags SET active = false WHERE ideas_flags.idea_id =$1;',[req.params.id], function(err, result){
        done();
        if(err){
          console.log('Error completing manage users query', err);
          res.sendStatus(501);
        } else {
              res.send(result.rows);
              console.log("this si RRRRREEESSSULT",result.rows);
            }
          });
        })
      });

      router.put('/deleteFlaggedComment/:id', function(req,res){
        console.log(".............",req.params.id);
      pool.connect( function (err, client, done) {
        client.query('UPDATE comments_flags SET active = false WHERE comments_flags.comment_id =$1;',[req.params.id], function(err, result){
          done();
          if(err){
            console.log('Error completing manage users query', err);
            res.sendStatus(501);
          } else {
                res.send(result.rows);
                console.log("this si RRRRREEESSSULT",result.rows);
              }
            });
          })
        });

        router.put('/deleteComment/:id', function(req,res){
          console.log(".............",req.params.id);
        pool.connect( function (err, client, done) {
          client.query('UPDATE comments SET active = false WHERE comments.id =$1;',[req.params.id], function(err, result){
            done();
            if(err){
              console.log('Error completing manage users query', err);
              res.sendStatus(501);
            } else {
                  res.send(result.rows);
                  console.log("this si RRRRREEESSSULT",result.rows);
                }
              });
            })
          });

          router.put('/deleteIdea/:id', function(req,res){
            console.log(".............",req.params.id);
          pool.connect( function (err, client, done) {
            client.query('UPDATE ideas SET active = false WHERE ideas.id =$1;',[req.params.id], function(err, result){
              done();
              if(err){
                console.log('Error completing manage users query', err);
                res.sendStatus(501);
              } else {
                    res.send(result.rows);
                    console.log("this si RRRRREEESSSULT",result.rows);
                  }
                });
              })
            });
module.exports = router;
