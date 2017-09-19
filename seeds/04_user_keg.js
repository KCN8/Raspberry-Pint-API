const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user_keg"; ALTER SEQUENCE user_keg_id_seq RESTART WITH 1;')

   .then(function(){

     var hash = bcrypt.hashSync('password', 8)

       var userData = [
         {
         user_id: 1,
         keg_id: 1
        },{
          user_id: 2,
          keg_id: 2
 },
       ]
      return knex('user_keg').insert(userData)
    })

}
