'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// dashboard & list app
Route.get('/dashboard', 'UserController.index').middleware(['auth']).as('dashboard');
// Add app
Route.get('/add-app', 'PageController.showAddApp').middleware(['auth']).as('dashboard');
Route.post('/add-app', 'UserController.addApp').middleware(['auth']).as('dashboard');
// Delete app
Route.post('admin/delete-app/:id', 'UserController.appDelete').middleware(['auth']).as('dashboard');

// Add user
Route.get('/add-user', 'PageController.showAddUser').middleware(['auth']).as('dashboard');
// admin add user
Route.post('admin/register', 'UserController.store').middleware(['auth']).as('dashboard');


// list users
Route.get('/list-users', 'UserController.listUsers').middleware(['auth']).as('dashboard.users');
// delete user
Route.delete('admin/delete-user/:id', 'UserController.deleteUser').middleware(['auth']).as('dashboard');


// view Ringtones App
Route.get('app/:id', 'RingtonController.ringtonesApp').middleware(['auth']).as('ringtones_app');

// delete rington
Route.delete('app/:app_id/rington/delete/:id', 'RingtonController.destroy').middleware(['auth']);
// add single rington
Route.get('app/:app_id/rington/add', 'PageController.showAddRington').middleware(['auth']);
Route.post('app/rington/:app_id/add', 'RingtonController.addRington').middleware(['auth']);
// add multiple rington
Route.get('app/:app_id/ringtons/add', 'PageController.showAddRingtons').middleware(['auth']);
Route.post('app/ringtons/:app_id/add', 'RingtonController.addRigtons').middleware(['auth']);


Route.group(() => {
  Route.get('/', 'PageController.showHome');
  Route.get('/login', 'PageController.showLogin');
}).middleware(['authenticated']);


Route.group(() => {
  Route.post('signup', 'AuthController.signup');
  Route.post('login', 'AuthController.login');
  Route.post('logout', 'AuthController.logout');
}).prefix('api/');

Route.group(() => {

  // List Ringtones per AppID
  Route.get('ringtones', 'RingtonController.loadRingtonsApp');
  // show single rington
  Route.get('rington/:app_id/file/:file_name', 'RingtonController.showRington');


}).prefix('api/v1/');
