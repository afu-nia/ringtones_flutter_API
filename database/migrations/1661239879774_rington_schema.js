'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RingtonSchema extends Schema {
  up() {
    this.create('ringtons', (table) => {
      table.increments('id').primary()
      table
        .integer('app_id')
        .unsigned()
        .references('apps.id')
        .onDelete('CASCADE')
      // table.increments()
      // table.integer('app_id').unsigned().references('id').inTable('apps')
      // table.unique(['app_id'])

      table.string('name', 254).notNullable()
      table.text('path_rington').notNullable();
      table.text('image').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('ringtons')
  }
}

module.exports = RingtonSchema
