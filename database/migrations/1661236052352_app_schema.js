'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppSchema extends Schema {
  up() {
    this.create('apps', (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      // table.increments()
      // table.integer('user_id').unsigned().references('id').inTable('users')
      // table.unique(['user_id'])
      table.string('name', 254).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('apps')
  }
}

module.exports = AppSchema
