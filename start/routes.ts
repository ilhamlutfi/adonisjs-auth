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

router.on('/').render('pages/home')

router.get('login', ({ view }) => {
  return view.render('pages/auth/login')
}).as('login')

router.get('register', ({ view }) => {
  return view.render('pages/auth/register')
}).as('register')

router.get('reset-password', ({ view }) => {
  return view.render('pages/auth/password/reset')
}).as('reset-password')

router.group(() => {
  router.get('dashboard', ({ view }) => {
    return view.render('pages/dashboard')
  }).as('dashboard')
}).use(middleware.auth())
