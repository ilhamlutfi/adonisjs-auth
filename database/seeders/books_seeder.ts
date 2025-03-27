import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BookFactory } from '#database/factories/book_factory'

export default class extends BaseSeeder {
  async run() {
    await BookFactory.createMany(100)
  }
}
