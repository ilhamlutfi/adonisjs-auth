import vine from '@vinejs/vine'

export const UserLogin = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().trim().maxLength(255)
  })
)
