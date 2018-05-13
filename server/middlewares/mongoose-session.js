import session from 'koa-generic-session';
import MongooseStore from 'koa-session-mongoose';

export default session({
  store: MongooseStore.create()
});
