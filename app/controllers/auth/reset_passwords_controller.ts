import type { HttpContext } from '@adonisjs/core/http'
import { UserResetPassword } from '#validators/user_reset_password'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import crypto from 'crypto'
import mail from '@adonisjs/mail/services/main'

export default class ResetPasswordsController {
  async index({ view }: HttpContext) {
    return view.render('pages/auth/password/reset')
  }

  async attempt({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(UserResetPassword)

    // check email is exist
    const user = await User.findBy('email', data.email)
    if (!user) {
      session.flash('notification', {
        type: 'danger',
        message: 'Email not found'
      })

      return response.redirect().back()
    }

    // create token
    const tokenValue = crypto.randomBytes(32).toString('hex')

    // save token
    await db.table('password_reset_tokens').insert({
      tokenable_id: user.id,
      token: tokenValue,
      expires_at: new Date(Date.now() + 60 * 60 * 1000)
    })

    // mailer
    await mail.send((message) => {
      message
        .from('mailtrap.io', 'Mailtrap Test')
        .to(user.email)
        .subject('Password Reset Notification')
        .html(`
          <h1> Hi ${user.fullName} </h1>
          <p> <a href="http://localhost:3333/forgot-password?token=${tokenValue}">Click here</a> to reset your password, token will expired in 1 hour </p>
        `)
    })

    session.flash('notification', {
      type: 'success',
      message: 'Password reset link sent to your email!',
    })

    return response.redirect().back()
  }
}
