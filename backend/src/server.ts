import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        // Logging.info(`Connected to mongoDB.`);
        console.log(`Connected to mongoDB.`);
        startServer();
    })
    .catch((err) => {
        // Logging.error('Unable to connect.');
        // Logging.error(err);
        console.log('Unable to connect.');
        console.log(err);
    });

/** Only start the server if Mongo Connects */
const startServer = () => {
    router.use((req, res, next) => {
        /** Log the Request */
        console.log(`incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the Response */
            console.log(`incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Contorl-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Contorl-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /** Routes */

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        console.log(error);
        return res.status(400).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}.`));
};
