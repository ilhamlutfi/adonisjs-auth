import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserLogin } from '#validators/user_login'

export default class LoginController {
  async index({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async attempt({ request, response, auth, session }: HttpContext) {
    try {
      // step 1: Validate and Get credentials from the request body
      const data = await request.validateUsing(UserLogin)

      // Step 2: Verify credentials
      const user = await User.verifyCredentials(data.email, data.password)

      // Step 3: Login user
      await auth.use('web').login(
        user,
        /**
         * Generate token when "remember_me" input exists
         */
        !!request.input('remember_me')
      )

      // Step 4: Send them to a protected route
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      if (error.messages) {
        session.flashValidationErrors(error)
      }

      session.flash('notification', {
        type: 'danger',
        message: 'Invalid email or password. Please try again.'
      })

      return response.redirect().toRoute('login')
    }
  }
}
