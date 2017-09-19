exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer', (table) =>{
    table.increments()
    table.text('name')
    table.text('photo')
    table.text('description')
    table.string('serving_temp')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('beer')
}
