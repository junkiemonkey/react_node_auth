// import db from '../../db/mongoose';
import News from './schema';

export const all = (cb, ctx) => News.find({}).lean().then(cb).catch(e => ctx.throw(e));

export const findOne = (type, cb, ctx) => News.findOne(type).then(cb).catch(e => ctx.throw(e));
