// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ServerApiVersion } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

interface IData {
  message: string
}

// const uri = "mongodb+srv://awalton:4ZCVwFION8cQOYVV@tbd01.nhjffxn.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// client.connect();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<IData>
// ) {
//     try {
//         const database = client.db("tbd01");
//         const collection = database.collection("users");
//         const result = await collection.insertOne(req.body)
//     } 
//     catch (err){
//       console.log(err)
//     }
//     finally {
//             await client.close();
//     }
//     res.status(200).json({ message: 'Nice page bro.' })
// }



import { Sequelize, Model, DataTypes } from 'sequelize'

// const user = 'postgres'
// const host = '127.0.0.1'
// const database = 'tbd01'
// const password = 'test123'
// const port = 5432
const sequelize = new Sequelize('postgres://postgres:test123@127.0.0.1:5432/users')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
//   console.log(req.body)
//   const sequelize = new Sequelize(database, user, password, {
//     host,
//     port,
//     dialect: 'postgres',
//     logging: true
//   })
class User extends Model {}

User.init({
  nickname: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  timestamps:true,
  modelName: 'User'
})
//
try {
  // await sequelize.authenticate();
  // console.log('Connection has been established successfully.');

  
  console.log(req.body)

  let now = new Date();
  let dd = String(now.getDate()).padStart(2, '0');
  let mm = String(now.getMonth() + 1).padStart(2, '0');
  let yyyy = now.getFullYear();
  let date = mm + '-' + dd + '-' + yyyy;

  const {nickname, password} = req.body;
  const result = await User.create({nickname, password, date})
  const dada = await User.findAll();
  console.log("All users:", JSON.stringify(dada, null, 2));
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
} 
    res.status(200).json({ message: 'Get out bro.' })
}
