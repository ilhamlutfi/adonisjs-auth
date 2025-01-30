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
import ForgotPasswordsController from '#controllers/auth/forgot_passwords_controller'
import { throttle } from '#start/limiter'

router.on('/').render('pages/home')

router.get('login', [LoginController, 'index']).as('login').use(middleware.guest())
router.get('register', [RegistersController, 'index']).as('register')
router.get('reset-password', [ResetPasswordsController, 'index']).as('reset-password')
router.get('forgot-password', [ForgotPasswordsController, 'index']).as('forgot-password')

router.group(() => {
  router.post('login', [LoginController, 'attempt']).as('login.attempt')
  router.post('register', [RegistersController, 'store']).as('register.store')
  router.post('reset-password', [ResetPasswordsController, 'attempt']).as('reset-password.attempt')
  router.post('forgot-password', [ForgotPasswordsController, 'attempt']).as('forgot-password.attempt')
}).use(throttle) // apply throttle/limiter middleware

router.group(() => {
  router.get('dashboard', ({ view }) => {
    return view.render('pages/dashboard')
  }).as('dashboard')

  router.post('logout', [LogoutsController, 'attempt']).as('logout')
}).use(middleware.auth())
