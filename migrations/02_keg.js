exports.up = function(knex, Promise) {
  return knex.schema.createTable('keg', (table) =>{
    table.increments()
    table.text('brew_name')
    table.text('photo')
    table.text('description')
    table.integer('temperature')
    table.integer('liters_used')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('keg')
}
