'use strict'

class CategoryController {

    Category = use('App/Models/Category')
    category = new this.Category()

    Project = use('App/Models/Project')
    project = new this.Project()

    index = async () => {
        return this.Category.all();
    }

    createCategory = async () => {
        this.category.name = "Wood Working"
        return await this.category.save()
    }
}

module.exports = CategoryController
