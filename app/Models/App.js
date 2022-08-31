'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class App extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    ringtons() {
        return this.hasMany('App/Models/Rington')
    }
}

module.exports = App
