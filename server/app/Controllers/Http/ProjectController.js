'use strict'

class ProjectController {
    Project = use('App/Models/Project')
    project = new this.Project();

    User = use('App/Models/User')
    user = new this.User();

    index = async () => {
        return await this.Project.all()
    }

    createProject = async () => {
        const userQuery = await this.User.findBy('id', '1')
        this.project.name = 'Token\'s project 2'
        this.project.description = 'project description 2'
        this.project.thumbnail = 'img.jpg'
        this.project.user_id = 2
        this.project.slug = `/${userQuery.$attributes.username.toLowerCase()}/tokens-project2`
        return await this.project.save()
    }

}

module.exports = ProjectController
