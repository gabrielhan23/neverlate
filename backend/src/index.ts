import http from 'http';

import * as dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db';

dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));