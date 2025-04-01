// custom rules for unique input
import { FieldContext } from '@vinejs/vine/types';
import vine from '@vinejs/vine';
import db from '@adonisjs/lucid/services/db';

/**
 * Options accepted by the unique rule
 */
export type Options = {
  table: string
  column: string
  editId?: number // tambahkan editId sebagai opsional
}

/**
 * Implementation
 */
async function unique(
  value: unknown,
  options: Options,
  field: FieldContext
) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const query = db
   .from(options.table)
   .select(options.column)
   .where(options.column, value)

  // Jika editId ditentukan, abaikan uid tersebut dalam validasi unik
  if (options.editId !== undefined) {
    query.whereNot('id', options.editId)
  }

  const row = await query.first()

  if (row) {
    field.report(
      'The {{ field }} field is not unique',
      'unique',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueRule = vine.createRule(unique)

