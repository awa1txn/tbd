import { Sequelize, Model, DataTypes } from 'sequelize'

const user = 'postgres'
const host = '127.0.0.1'
const database = 'tbd01'
const password = 'test123'
const port = 5432

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
})

class User extends Model {}

async function results(){
    return await User.findAll({
        attributes: ['name']
      })
}