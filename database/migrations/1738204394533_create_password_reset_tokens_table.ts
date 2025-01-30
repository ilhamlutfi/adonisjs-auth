import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_reset_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('token').notNullable().unique()
      table.timestamp('created_at')
      table.timestamp('expires_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
