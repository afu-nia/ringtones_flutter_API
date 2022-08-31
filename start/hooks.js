'use strict'

const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Exception = use('Exception');

  Exception.handle('InvalidSessionException', (error, { response }) => {
    return response.redirect('/login');
  });
})

hooks.after.providersBooted(() => {

  const View = use('View')


  View.global('paginationArray', nbPage => {
    return Array.from(new Array(nbPage), (value, index) => index + 1)
  });


})