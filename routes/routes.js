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


//beers GET
router.get('/beers', function(req, res){
  return knex('beer').select()
    .then(function (result){
      res.json(result)
    })
})


//beers POST
router.post('/beers', function(req, res){
  let newBeer = req.body
  return knex('beer').insert(newBeer).returning('*')
    .then(function (newBeer){
      res.json(newBeer)
    })
})



// kegs GET
router.post('/kegs', function(req, res){
  let newKeg = req.body
  return knex('keg').insert(newKeg).returning('*')
    .then(function (newKeg){
      res.json(newKeg)
    })
})


// kegs POST
router.post('/kegs', function(req, res){
  return knex('keg').select()
    .then(function (result){
      res.json(result)
    })
})


//Kegs by id GET
router.get('/kegs-by-id/:id', function(req, res){
    knex.from('keg')
    .where('keg.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//Kegs by id POST
router.get('/kegs-by-id/:id', function(req, res){
    knex.from('keg')
    .where('keg.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//beers by id GET
router.get('/beers-by-id/:id', function(req, res){
    knex.from('beer')
    .where('beer.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//beers by id POST
router.post('/beers-by-id/:id', function(req, res){
    knex.from('beer')
    .where('beer.id', req.params.id)
    .then(function(data){
      res.send(data);
    })
})


//All kegs and beers associalted with them  GET
router.get('/keg-and-beer/', function(req, res){
  knex.from('keg')
  .innerJoin('beer', 'keg.beer_id', 'beer.id')
  .then(function(data){
    res.send(data);
    })
})


//All kegs and beers associalted with them  POST
router.post('/keg-and-beer/', function(req, res){
  knex.from('keg')
  .innerJoin('beer', 'keg.beer_id', 'beer.id')
  .then(function(data){
    res.send(data);
    })
})



module.exports = router
