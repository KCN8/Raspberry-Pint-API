const express = require('express')
const router = express.Router()
const knex = require('../db/connection')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const queries = require('../db/queries')
require('dotenv').config()

router.get('/users', function(req, res){
  queries.getUsers()
    .then(function (result){
      res.json(result)
    })
})



// Log in
router.post('/login', function(req, res, next) {
  knex('user').where('email', req.body.email)
    .then(user => {
      if (user.length === 0) {
        res.json({
          error: 'That user does not exist'
        })
      } else {
        var match = bcrypt.compareSync(req.body.password, user[0].password)
        if (match) {
          delete user[0].password
          var token = jwt.sign(user[0], process.env.TOKEN_SECRET);
          res.json({
            data: token
          })
        } else {
          res.json({
            error: 'Email or password did not match'
          })
        }
      }
    })
});





// Sign up
  router.post('/signup', function(req, res, next) {
  console.log(req.body);
  knex('user').select().where('email', req.body.email)
    .then(user => {
      if (user.length === 0) {
        var saltRounds = 10
        var hash = bcrypt.hashSync(req.body.password, saltRounds)
        req.body.password = hash
        knex('user').insert(req.body).returning('*')
          .then(user => {
            console.log(user)
            res.json({message: 'Sign up successful. ' + user[0].username + ' you can now log in with your chosen email & password'});
            res.json(user)
          })
      } else {
        res.json({error: 'Email already in use. Do you have an account already?'})
      }
    })
})


//all beers  --- See what beers we have in our "beer" table
router.get('/beers', function(req, res){
  queries.getKegs()
    .then(function (result){
      res.json(result)
    })
})

//all kegs --- use Just in case we want to see what kegs we have in our "keg" table
router.get('/kegs', function(req, res){
  queries.getKegs()
    .then(function (result){
      res.json(result)
    })
})


//Kegs by id  --- use route for keg status page
router.get('/kegs-by-id/:id', function(req, res){
    knex.from('keg')
    .where('keg.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//beers by id  - Use to get ID for FK beer_name in the object that will create a keg
router.get('/beers-by-id/:id', function(req, res){
    knex.from('beer')
    .where('beer.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//beers by id  - Use to get ID for FK beer_name in the object that will create a keg
router.get('/keg-and-beer/', function(req, res){
  knex.from('keg')
  .innerJoin('beer', 'keg.beer_id', 'id')
  .then(function(data){
    res.send(data);
    })
})





// BUTTONS: Add Keg (plus icon) Home (house icon), Whats on tap (beer icon), Contact/Info (person)




// -- Mo START

// Whats on tap (beer icon) Should take you to whats on tap page. Shows kegs or a directive to add a keg

// Home (house icon) icon takes you back to start page

// Contact/Info (person) takes you to a page about our team/link to github etc

// -- Mo END




// --  John (primary) & Rick (support) START

// Plus button. Get from API or user added.

// Post this data to beers (Beer Table)

// Do a retrieve id of beer and store in variable

// take beer id variable and add it to object that will post to kegs

// take form question and add that to object that will post to kegs

// take object created from beer id and

// post new keg object to database

// redirect to whats on Tap

// --  John (primary) & Rick (support) END



// Rick START

// Do a Get Request for all kegs and display on the whats on tap screen with good style

// Rick END



// Eric START

// Migrate and seed database

// Routes

// make basic RPI postin program

// Eric END


















module.exports = router
