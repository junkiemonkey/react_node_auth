'use strict';
const parse = require('co-busboy');
const fs = require('fs');
const crypto = require('crypto');

module.exports = function*(next){
  if(!this.request.is('multipart/*')) return yield* next;

  let parts = parse(this, {autoFields: true});
  let len = parts.length;
  let part;
  let random = crypto.randomBytes(4).readUInt32LE(0);
  let filename;
  while (part = yield parts){
    filename = part.filename;
    part.pipe(fs.createWriteStream('./static/images/' + random + '.' + filename));
  }
  // console.log(parts.fields);
  for (let i = 0; i<len; i++) {
    this.request.body[parts.fields[i][0]] = parts.fields[i][1];
  }
  this.request.body.image = '/images/' + random + '.' + filename;
  yield* next;
};