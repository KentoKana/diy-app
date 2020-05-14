'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Project extends Model {

    user() {
        return this.hasOne('App/Models/User');
    }

    categories() {
        return this.hasMany('App/Models/Category')
    }
}

module.exports = Project;