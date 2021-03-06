exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_keg', (table) =>{
    table.increments()
    table.integer('user_id').references('user.id').onDelete('CASCADE');
    table.integer('keg_id').references('keg.id').onDelete('CASCADE');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_keg')
}
