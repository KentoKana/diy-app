'use strict'


class UserController {
    User = use('App/Models/User')
    Project = use('App/Models/Project')

    index = async ({ request, response }) => {
        const users = await this.User.query().setHidden(['password']).fetch()
        return response.status(200).json({
            users: users
        })
    }

    createUser = async ({ request, response }) => {
        const user = await this.User.create({
            username: 'Toocan',
            email: 'toocan@token.com',
            password: 'password'
        })

        return response.status(200).json({
            message: 'Success!',
            data: user
        })
    }

    getUserProjects = async ({ request, response }) => {
        const projectQuery = await this.Project.query().where('user_id', 2).fetch()
        return response.status(200).json({
            userProjects: projectQuery
        })
    }

}

module.exports = UserController
