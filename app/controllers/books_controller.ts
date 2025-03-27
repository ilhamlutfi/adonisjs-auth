import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const search = request.input('search')
    const page = request.input('page', 1)
    const limit = 20

    const query = Book.query().select('id', 'title', 'slug', 'author', 'published_at')

    if (search) {
    // search custom collation + filter out SQL injection
    // query.whereRaw('title LIKE ? COLLATE utf8mb4_unicode_ci', [`%${search.replace(/[%_]/g, '\\$&')}%`])
      query.whereILike('title', `%${search}%`)
    }

    const books = await query.paginate(page, limit)

    return view.render('pages/books/index', {
      books,
      search,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
