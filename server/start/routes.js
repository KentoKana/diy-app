'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/users', 'UserController.index')
Route.get('/projects', 'ProjectController.index')
Route.get('/user-projects', 'UserController.getUserProjects')
Route.get('/categories', 'CategoryController.index')

// Should be posts
Route.get('/create/user', 'UserController.createUser')
Route.get('/create/project', 'ProjectController.createProject')
Route.get('/create/category', 'CategoryController.createCategory')