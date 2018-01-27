import parse from 'await-busboy';
import fs from 'fs';
import crypto from 'crypto';

export default async (ctx, next) => {
  if (!ctx.request.is('multipart/*')) return await next();

  const parts = parse(ctx, {autoFields: true});
  const random = crypto.randomBytes(4).readUInt32LE(0);

  let part;

  while (part = await parts) {
    part.pipe(fs.createWriteStream('./static/images/' + random + '.' + part.filename));
  }

  ctx.request.body = parts.field;
  ctx.request.body.image = '/static/images/' + random + '.' + filename;
  await next();
};