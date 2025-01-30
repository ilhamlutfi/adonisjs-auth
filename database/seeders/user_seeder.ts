import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'User Example',
        email: 'user@example.com',
        password: 'password', // auto hashed
      }
    ])
  }
}
