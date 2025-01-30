import vine from '@vinejs/vine'

export const UserForgotPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().minLength(6).maxLength(255),
    password_confirmation: vine.string().sameAs('password')
  })
)
