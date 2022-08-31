'use strict'

/*
|--------------------------------------------------------------------------
| RingtoneSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database');


class RingtoneSeeder {
  async run() {
    const user = await Database.from('ringtons').insert(
      [
        {
          app_id: 2,
          name: 'amor 0',
          path_rington: 'https://musikringtone.com/downloads/3394/',
          image: 'https://images.theconversation.com/files/122137/original/image-20160511-18171-kulas4.jpg'
        },
        {
          app_id: 2,
          name: 'amor 1',
          path_rington: 'https://musikringtone.com/downloads/3394/',
          image: 'https://images.theconversation.com/files/122137/original/image-20160511-18171-kulas4.jpg'
        },
        {
          app_id: 1,
          name: 'Risa 0',
          path_rington: 'https://musikringtone.com/downloads/3394/',
          image: 'https://st2.depositphotos.com/1001911/7684/v/450/depositphotos_76840867-stock-illustration-pointing-at-himself-emoticon.jpg'
        },
        {
          app_id: 1,
          name: 'Risa 1',
          path_rington: 'https://musikringtone.com/downloads/3394/',
          image: 'https://st2.depositphotos.com/1001911/7684/v/450/depositphotos_76840867-stock-illustration-pointing-at-himself-emoticon.jpg'
        },
      ]
    );
  }
}

module.exports = RingtoneSeeder
