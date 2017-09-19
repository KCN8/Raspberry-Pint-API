exports.up = function(knex, Promise) {
  return knex.schema.createTable('keg', (table) =>{
    table.increments()
    table.string('temperature')
    table.integer('keg_size_liters')
    table.integer('liters_used')
    table.integer('beer_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('keg')
}
