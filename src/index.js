import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { PORT } from "./config/serverConfig.js";
import DBConnect from './config/dbConfig.js';

import {ApiRoutes} from './routes/index.js';

const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}

const prepareAndStartServer = () => {

    const app = express();

    app.use(cors(corsOrigin));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        await DBConnect();
    });
}

prepareAndStartServer();