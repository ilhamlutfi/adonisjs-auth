import vine from '@vinejs/vine'

export const RegisterUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().unique(async (db, value) => {
      return !(await db.from('users').where('email', value).first())
    }),
    password: vine.string().trim().minLength(6).maxLength(255),
    password_confirmation: vine.string().sameAs('password')
  })
)
