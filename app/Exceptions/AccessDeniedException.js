'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccessDeniedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({
      message: 'Acceso Denegado'
    })
  }
}

module.exports = AccessDeniedException
