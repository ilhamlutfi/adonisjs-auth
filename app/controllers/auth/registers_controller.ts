import { HttpContext } from '@adonisjs/core/http'
import { RegisterUserValidator } from '#validators/user_register'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class RegistersController {
  async index({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      // validation
      const data = await request.validateUsing(RegisterUserValidator)

      // hashing password
      data.password = await hash.make(data.password)

      // save user
      await User.create({
        fullName: data.full_name,
        email: data.email,
        password: data.password
      })

      // message
      session.flash('notification', {
        type: 'success',
        message: 'Your account has been created successfully.'
      })

      // redirect
      return response.redirect().toRoute('login')
    } catch (error) {
      session.flash('notification', {
        type: 'danger',
        message: 'Something went wrong. Please try again.'
      })

      session.flashValidationErrors(error)

      return response.redirect().toRoute('register')
    }
  }
}
