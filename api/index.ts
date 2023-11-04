import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

dotenv.config();
const app: Express = express();

// Parse request body
app.use(bodyParser.json());
// Enabling requests from different origins
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
});

AppDataSource.initialize()
    .then(() => {
        app.listen(process.env.PORT);
        console.log('✅ DB connected and server running');
    })
    .catch((err) => {
        console.log('❌ Something went wrong while connecting to the DB');
        console.log(err);
    });

app.use('/', tasksRouter);
