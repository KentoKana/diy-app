'use strict'

class ProjectController {
    Project = use('App/Models/Project')
    User = use('App/Models/User')
    Helpers = use('Helpers')

    index = async ({ request, response }) => {
        const projects = await this.Project.query().with('categories').select('*').fetch()
        response.status(200).json({
            projects: projects
        })
        // console.log(this.Helpers.publicPath() + "\\\pyramid.png")
    }

    createProject = async ({ request, response }) => {
        const userQuery = await this.User.findBy('id', '2')
        const project = await this.Project.create({
            name: 'Token\'s project 4',
            description: 'project description 4',
            thumbnail: 'img.jpg',
            user_id: 2,
            slug: `/${userQuery.$attributes.username.toLowerCase()}/tokens-project4`
        })

        await project.categories().attach([1, 2])

        return response.status(200).json({
            message: "Success!",
            data: await project,
            categories: await project.categories().fetch()
        })
    }

}

module.exports = ProjectController
