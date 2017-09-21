const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "beer"; ALTER SEQUENCE beer_id_seq RESTART WITH 1;')

   .then(function(){

     var hash = bcrypt.hashSync('password', 8)

       var userData = [{
         name: 'Mojo IPA',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/553ea190e4b0e1b549d3fd21/5565fe80e4b02cc99128c794/1432747650173/Mojo6Pack_WEB.jpg?format=750w',
         description: 'Pale in color but packed with flavor, Mojo reflects the perfect balance of hop bitterness and malt character. ',
         serving_temp: 33,
       },{
         name: 'Shake Chocolate Porter',
         photo: 'https://static1.squarespace.com/static/5519a5eae4b0d37c5805566b/553ea066e4b04d55e9588601/553fe7b2e4b0b5de8a9ad6dd/1430251443928/Shake_6Pack.jpg?format=500w',
         description: 'This unique brew blends five different grains, including Chocolate Wheat, that along with cacao nibs create a devilishly delicious chocolate finish with a velvety mouthfeel.',
         serving_temp: 33,
          }]
      return knex('beer').insert(userData)
    })

}
