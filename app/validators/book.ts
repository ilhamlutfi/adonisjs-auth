import vine from '@vinejs/vine';
import './custom_rules/call.js';

const BookValidator = (id?: number) => {
  const validationRules = vine.compile(
  vine.object({
     title: vine.string().trim().minLength(3).maxLength(255).unique({
        table: 'books',
        column: 'title',
        editId: id
      }),

    author: vine.string().trim().maxLength(255),
    description: vine.string().trim().maxLength(255),
    published_at: vine.string().trim().maxLength(255),
  }))

  return validationRules;
}

export { BookValidator };
