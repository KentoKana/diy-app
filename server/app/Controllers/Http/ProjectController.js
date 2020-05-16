'use strict'

class ProjectController {
    Project = use('App/Models/Project')
    User = use('App/Models/User')

    index = async ({ request, response }) => {
        const projects = await this.Project.all()
        response.status(200).json({
            projects: projects
        })
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

        return response.status(200).json({
            message: "Success!",
            data: project
        })
    }

}

module.exports = ProjectController
