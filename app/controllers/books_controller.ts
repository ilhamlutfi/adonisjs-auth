import Book from '#models/book'
import { BookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)
    const limit = 20

    const query = Book.query().select('id', 'title', 'author', 'published_at', 'created_at')

    if (search) {
    // search custom collation + filter out SQL injection
    // query.whereRaw('title LIKE ? COLLATE utf8mb4_unicode_ci', [`%${search.replace(/[%_]/g, '\\$&')}%`])
      query.whereILike('title', `%${search}%`)
    }

    const books = await query.orderBy('created_at', 'desc').paginate(page, limit)

    return view.render('pages/books/index', {
      books,
      search,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/books/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    try {
      // validation
      const data = await request.validateUsing(BookValidator())

      // save book
      await Book.create({
        title: data.title,
        author: data.author,
        description: data.description,
        published_at: DateTime.fromFormat(data.published_at, 'yyyy-MM-dd'),
      })

      // message
      session.flash('notification', {
        type: 'success',
        message: 'Book has been created successfully.',
      })

      // response
      return response.redirect().toRoute('books.index')
    } catch (error) {
      if (error.messages) {
        session.flashValidationErrors(error)
      }
      session.flash('notification', {
        type: 'danger',
        message: 'Something went wrong. Please try again.' + error,
      })

      return response.redirect().toRoute('books.create')
    }
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    // get book
    const book = await Book.findOrFail(params.id)

    return view.render('pages/books/show', {
      book,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    // get book
    const book = await Book.findOrFail(params.id)

    return view.render('pages/books/edit', {
      book,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    try {
       // get book
      // findOrFail will throw an error if the book is not found
      const book = await Book.findOrFail(params.id)

      // validation
      const data = await request.validateUsing(BookValidator(book.id))

      // update book
      book.title = data.title
      book.author = data.author
      book.description = data.description
      book.published_at = DateTime.fromFormat(data.published_at, 'yyyy-MM-dd')
      await book.save()

      // message
      session.flash('notification', {
        type: 'success',
        message: 'Book has been updated successfully.',
      })

      // response
      return response.redirect().toRoute('books.index')
    } catch (error) {
      if (error.messages) {
        session.flashValidationErrors(error)
      }
      session.flash('notification', {
        type: 'danger',
        message: 'Something went wrong. Please try again.' + error,
      })

      return response.redirect().back()
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    try {
      // get book
      // findOrFail will throw an error if the book is not found
      const book = await Book.findOrFail(params.id)

      // delete book
      await book.delete()

      // message
      session.flash('notification', {
        type: 'success',
        message: 'Book has been deleted successfully.',
      })

      // response
      return response.redirect().toRoute('books.index')
   } catch (error) {
      if (error.messages) {
        session.flashValidationErrors(error)
      }
      session.flash('notification', {
        type: 'danger',
        message: 'Something went wrong. Please try again.' + error,
      })

      return response.redirect().toRoute('books.index')
   }

  }
}
