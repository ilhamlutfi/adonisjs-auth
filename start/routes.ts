/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import RegistersController from '#controllers/auth/registers_controller'

router.on('/').render('pages/home')

router.get('login', ({ view }) => {
  return view.render('pages/auth/login')
}).as('login')

router.get('register', [RegistersController, 'index']).as('register')
router.post('register', [RegistersController, 'store']).as('register.store')

router.get('reset-password', ({ view }) => {
  return view.render('pages/auth/password/reset')
}).as('reset-password')

router.group(() => {
  router.get('dashboard', ({ view }) => {
    return view.render('pages/dashboard')
  }).as('dashboard')
}).use(middleware.auth())
