const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "keg"; ALTER SEQUENCE keg_id_seq RESTART WITH 1;')

   .then(function(){

     var hash = bcrypt.hashSync('password', 8)

       var data = [{
         temperature: '33',
         keg_size_liters: 60,
         liters_used: 0,
         beer_id: 1,
       },{
         temperature: '33',
         keg_size_liters: 60,
         liters_used: 0,
         beer_id: 2,
          }]
      return knex('keg').insert(data)
    })

}
