import { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize, Model, DataTypes } from 'sequelize'

// const user = 'postgres'
// const host = '127.0.0.1'
// const database = 'tbd01'
// const password = 'test123'
// const port = 5432

// const sequelize = new Sequelize(database, user, password, {
//   host,
//   port,
//   dialect: 'postgres',
//   logging: false
// })

const sequelize = new Sequelize('postgres://postgres:root@127.0.0.1:5432/tbddev1')

class Users extends Model { }

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'Users'
})

let findUserDevice = async function (userID: any) {

  // return the promise itself
  try {
    return Users.findAll({
      where: {
        id: userID
      }
    }).then(function (device: any) {
      if (!device) {
        return 'not found';
      } else {
        if (device.length !== 0) {
          return device[0].dataValues;
        } else {
          return 'not found'
        }
      }

    });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

let findUserEmailDevice = async function (user: any) {

  // return the promise itself
  try {
    return Users.findAll({
      where: {
        email: user.email
      }
    }).then(function (device: any) {
      if (!device) {
        return {}//not found
      } else {
        if (device.length !== 0) {
          return device[0].dataValues;
        }
        return {};
      }
    });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

let createUserDevice = async function (user: any) {
  // return the promise itself
  try {
    return Users.create({ email: user.email, role: 0, image: user.image, createdAt: Sequelize.fn('NOW'), updatedAt: Sequelize.fn('NOW') });
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  // Set isSigned to false initially
  let isSigned = false;

  // Check if isSigned is false
  if (!isSigned) {
    // Try to execute the following code, and catch any errors
    try {
      // Check if req.body is not an empty string
      if (req.body !== '') {
        // Check if req.body is not a number
        if (isNaN(req.body)) {
          // Parse the JSON in req.body and find a user with the specified email and device
          const requestBody = JSON.parse(req.body);
          findUserEmailDevice(requestBody)
            .then(function (user: any) {
              // If a user was found, send a JSON response with the user's information
              if (typeof user === 'object' && user !== null && Object.keys(user).length !== 0) {
                res.status(200).json(user);
              }
              // If no user was found, create a new user with the specified email and device, and send a JSON response with the new user's information
              else {
                createUserDevice(requestBody).then(function (user: any) {
                  res.status(200).json(user);
                });
              }
            });
        }
        // If req.body is a number, find a user with the specified device
        else {
          findUserDevice(req.body).then(function (user: any) {
            res.status(200).json(user);
          });
        }
      }
      // Set isSigned to true to indicate that the code has been executed successfully
      isSigned = true;
    }
    // If there is an error, log the error message to the console
    catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }
}