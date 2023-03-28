// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    responseLimit: false,
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if(err){
        reject(err)
        return;
      }
      resolve({fields, files})
      await saveFile(files.file);
      return res.status(201).send('File uploaded.');
    })
  })
}

const saveFile = async (file: any) => {
  console.log(file)
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/maps/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.method === "POST" 
    ? post(req, res) //file upload
    : req.method === "PUT"
    ? console.log('put') // file changes //no needs for that
    : req.method === 'DELETE'
    ? console.log('delete') // file delete
    : req.method === 'GET'
    ? console.log('get') // check if file exists
    : res.status(404).send('didnt find that method.')
}
