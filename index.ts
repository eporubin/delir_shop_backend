
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import AWS from "aws-sdk";
import {awsConfig} from "./config/config"


AWS.config.update(awsConfig.aws_remote_config);


const dynamoDB = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient()



dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  documentClient
  .scan({
    TableName: awsConfig.aws_table_name,
  })
  .promise()
  .then((data: any) => {
    res.json({
      data: data
    })
  })
  .catch((err: any) => {
    res.json({
      error: err
    })
  } )
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

});