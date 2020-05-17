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

Route.get('/api/users', 'UserController.index')
Route.get('/api/projects', 'ProjectController.index')
Route.get('/api/user-projects', 'UserController.getUserProjects')
Route.get('/api/categories', 'CategoryController.index')
Route.get('/csrf', function* (req, res) { res.cookie("token", "hi") })

// Should be posts
Route.get('/api/create/user', 'UserController.createUser')
Route.get('/api/create/project', 'ProjectController.createProject')
Route.get('/api/create/category', 'CategoryController.createCategory')

//Login
Route
    .post('api/login', 'UserController.login')
Route
    .get('api/users/:id', 'UserController.showAuthenticatedUser')
