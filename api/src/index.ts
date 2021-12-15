import express from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import {registerController} from 'express-controller';
import session from 'express-session';
import 'express-async-errors';

require('dotenv').config();

const app = express();
const iPort = process.env.APP_PORT || 8000;

const SQLiteStore = require('connect-sqlite3')(session);

/**
 * Express Bootstrapper
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
(async () => {
  await createConnection();

  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(cors({
    // origin: 'http://localhost:3000',
    origin: ['http://localhost:3000', 'http://192.168.100.137:3000'],
    credentials: true
  }))
  app.use(session({
    secret: 'a-very-secret-session-token',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
      maxAge: 7 * 24 * 60 * 60 * 1000
    },
    store: new SQLiteStore()
  }))
  app.use('/api', registerController(path.resolve(__dirname, 'controllers')))
  app.listen(iPort, () => {
    console.log('ready - listening on http://localhost:' + iPort);
  });
})();
