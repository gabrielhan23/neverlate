import http from 'http';

import * as dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db';
import loadMiddleware from './config/middleware';
import passportInit from './config/passport';
import login from './routes/login';
import access from './routes/access';

dotenv.config();

connectDB();
passportInit();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

loadMiddleware(app);
app.use(login);
app.use(access);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));