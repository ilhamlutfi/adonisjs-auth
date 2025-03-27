import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { DateTime } from 'luxon' // ✅ Import Luxon DateTime

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      author: faker.internet.username(),
      description: faker.lorem.sentence(),
      publishedAt: DateTime.fromJSDate(faker.date.past()),
      createdAt: DateTime.fromJSDate(faker.date.past()),
      updatedAt: DateTime.fromJSDate(faker.date.past()),
    }
  })
  .build()
