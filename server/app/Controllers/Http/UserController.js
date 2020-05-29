'use strict'
const { validateAll } = use('Validator')

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

    login = async ({ auth, request, response }) => {
        const rules = {
            email: 'required|email',
            password: 'required'
        }
        const messages = {
            'email.required': 'Please enter your email',
            'email.email': 'Please enter a valid email',
            'password.required': 'Please enter your password'
        }
        const validation = await validateAll(request.all(), rules, messages)

        if (validation.fails()) {
            console.log(await validation.messages())

            const validationMessages = validation.messages();
            return response.json(
                validationMessages
            )
        }
        const { email, password } = request.only(['email', 'password'])
        const token = await auth.attempt(email, password)
        return response.json(token)

    }

    showAuthenticatedUser = async ({ auth }) => {
        try {
            return await auth.getUser()
        } catch (error) {
            return { error: "Missing or Invalid Token" }
        }
    }

    getUserByUsername = async ({ params, response }) => {
        const username = params.username
        const user = await this.User.query().where('username', username).fetch()
        return user.rows[0]

    }

}

module.exports = UserController
