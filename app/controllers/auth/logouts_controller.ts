import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutsController {
  async attempt({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toRoute('login')
  }
}
