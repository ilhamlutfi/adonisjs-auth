import vine from '@vinejs/vine'

export const UserResetPassword = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255)
  })
)
