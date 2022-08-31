'use strict'

/*
|--------------------------------------------------------------------------
| AdminUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash');
const Database = use('Database');

class AdminUserSeeder {
  async run() {
    const user = await Database.from('users').insert(
      [
        {
          id: 1,
          name: 'Admin User',
          email: 'g1iorey87@gmail.com',
          password: await Hash.make('123456'),
          roll: 1
        },
        {
          id: 2,
          name: 'Gio User',
          email: 'g1iorey87_1@gmail.com',
          password: await Hash.make('123456'),
          roll: 0
        }
      ]
    );
  }
}

module.exports = AdminUserSeeder
