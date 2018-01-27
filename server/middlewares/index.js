import logger from './logger';
import templates from './templates';
import errors from './errors';
import staticMiddleware from './static';
import mongooseSession from './mongoose-session';
import parser from './body-parser';
import multipart from './multipart-parser';
import passport from './passport-init';
import passportSession from './passport-session';

export default [
  // staticMiddleware,
  // logger,
  templates,
  // errors,
  // mongooseSession,
  // parser,
  // multipart,
  passport,
  passportSession
];
