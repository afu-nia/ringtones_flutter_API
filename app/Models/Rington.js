'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rington extends Model {
    app() {
        return this.belongsTo('App/Models/App')
    }
}

module.exports = Rington
