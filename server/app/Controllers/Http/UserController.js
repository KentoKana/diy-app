'use strict'


class UserController {
    User = use('App/Models/User')
    user = new this.User()

    Project = use('App/Models/Project')
    project = new this.Project()

    index = async () => {
        return await this.User.all()
    }

    createUser = async () => {
        this.user.username = 'Token'
        this.user.email = 'token@token.com'
        this.user.password = 'password'
        await this.user.save()
    }

    getUserProjects = async () => {
        const projectQuery = await this.Project.query().where('user_id', 2).fetch()
        return projectQuery
    }
}

module.exports = UserController
