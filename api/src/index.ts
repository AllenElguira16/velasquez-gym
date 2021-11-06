import express from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import {registerController} from 'express-controller';
import session from 'express-session';
import 'express-async-errors';

require('dotenv').config();

// import registerController from './helpers/controller';

const app = express();
const iPort = process.env.APP_PORT || 8000;

/**
 * Express Bootstrapper
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
(async () => {
  await createConnection();

  app
    .use(express.json({ limit: '50mb' }))
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }))
    .use(session({
      secret: 'a-very-secret-session-token',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: 'auto'
      }
    }))
    .use('/api', registerController(path.resolve(__dirname, 'controllers')))
    .listen(iPort, () => {
      console.log('ready - listening on http://localhost:' + iPort);
    });
})();
