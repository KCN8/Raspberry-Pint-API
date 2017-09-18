const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "keg"; ALTER SEQUENCE keg_id_seq RESTART WITH 1;')

   .then(function(){

     var hash = bcrypt.hashSync('password', 8)

       var userData = [{
         brew_name: 'Mojo IPA',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/553ea190e4b0e1b549d3fd21/5565fe80e4b02cc99128c794/1432747650173/Mojo6Pack_WEB.jpg?format=750w',
         description: '',
         temperature: 33,
         liters_used: 0,
       },{
         brew_name: 'Shake Chocolate Porter',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/553ea066e4b04d55e9588601/553fe7b2e4b0b5de8a9ad6dd/1430251443928/Shake_6Pack.jpg?format=500w',
         description: '',
         temperature: 33,
         liters_used: 0,
       },{
         brew_name: 'Pulp Fusion Blood Orange IPA',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/56fae7d87da24fbb6632bf30/57588c6bcf80a1fdaca9a15d/1465421851911/Pulp6pk.jpg?format=750w',
         description: '',
         temperature: 33,
         liters_used: 0,
       },{
         brew_name: 'Hazed Hoppy Session Ale',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/553ea190e4b0e1b549d3fd21/5565fe80e4b02cc99128c794/1432747650173/Mojo6Pack_WEB.jpg?format=750w',
         description: '',
         temperature: 33,
         liters_used: 0,
          }]
      return knex('keg').insert(userData)
    })

}
