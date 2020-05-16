'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectCategorySchema extends Schema {
  up() {
    this.create('project_category', (table) => {
      table.increments()
      table.integer('project_id').unsigned().index('project_id')
      table.integer('category_id').unsigned().index('category_id')
      table.foreign('project_id').references('projects.id').onDelete('cascade')
      table.foreign('category_id').references('categories.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('project_category')
  }
}

module.exports = ProjectCategorySchema
