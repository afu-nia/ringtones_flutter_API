'use strict'

/*
|--------------------------------------------------------------------------
| AppSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database');

class AppSeeder {
  async run() {
    // const user = await Database.from('apps').insert(
    //   [
    //     {
    //       id: 1,
    //       user_id: 1,
    //       name: 'Risa',
    //     },
    //     {
    //       id: 2,
    //       user_id: 2,
    //       name: 'Romance',
    //     }
    //   ]
    // );
  }
}

module.exports = AppSeeder
