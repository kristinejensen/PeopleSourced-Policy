var express = require('express');
var router = express.Router();
var pg = require('pg');
// var connectionString = require('../modules/database-config');
var config = {
  database: 'psp_database',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//end of config

//pool / pg constructor function
var pool = new pg.Pool(config);

//adds new user to DB
router.post('/newUser', function (req, res) {
  var newUser = req.body;
  console.log('newUser: ', newUser);
  pool.connect()
    .then(function (client) {
      client.query('INSERT INTO users (name, street, city, state, zipCode, country, email) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [newUser.name, newUser.street, newUser.city, newUser.state, newUser.zipCode, newUser.country, newUser.email])
        .then(function (result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function (err) {
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.post








module.exports = router;
