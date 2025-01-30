import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import { UserForgotPasswordValidator } from '#validators/user_forgot_password'
import hash from '@adonisjs/core/services/hash'

export default class ForgotPasswordsController {
  async index({ view, request }: HttpContext) {
    const token = await this.checkToken(request.input('token'))

    if (typeof token === 'string') {
      return token // "Token is invalid or expired"
    }

    const user = await User.find(token.tokenable_id)
    return view.render('pages/auth/password/forgot', { user, tokenValue: token.token })
  }

  async attempt({ request, response, session }: HttpContext) {
    // validate
    const data = await request.validateUsing(UserForgotPasswordValidator)

    // check token
    const token = await this.checkToken(request.input('token'))
    if (typeof token === 'string') {
      return token // "Token is invalid or expired"
    }

    // update new password
    const newPassword = await hash.use('scrypt').make(data.password)
    await User.query().where('id', token.tokenable_id).update({
      password: newPassword
    })

    // delete token
    await db.from('password_reset_tokens')
        .where('token', token.token)
        .delete()

    session.flash('notification', {
      type: 'success',
      message: 'Password has been reset. You can now log in!',
    })

    return response.redirect().toRoute('login')
  }

  async checkToken(tokenValue: string) {
    const token = await db.from('password_reset_tokens')
      .where('token', tokenValue)
      .first()

    if (!token || new Date(token.expires_at) < new Date()) {
      return 'Token is invalid or expired'
    }

    return token
  }
}
