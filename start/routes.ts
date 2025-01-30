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
import LoginController from '#controllers/auth/login_controller'
import LogoutsController from '#controllers/auth/logouts_controller'
import ResetPasswordsController from '#controllers/auth/reset_passwords_controller'

router.on('/').render('pages/home')

router.get('login', [LoginController, 'index']).as('login').use(middleware.guest())
router.post('login', [LoginController, 'attempt']).as('login.attempt')

router.get('register', [RegistersController, 'index']).as('register')
router.post('register', [RegistersController, 'store']).as('register.store')

router.get('reset-password', [ResetPasswordsController, 'index']).as('reset-password')
router.post('reset-password', [ResetPasswordsController, 'request']).as('reset-password.request')

router.group(() => {
  router.get('dashboard', ({ view }) => {
    return view.render('pages/dashboard')
  }).as('dashboard')

  router.post('logout', [LogoutsController, 'attempt']).as('logout')
}).use(middleware.auth())
