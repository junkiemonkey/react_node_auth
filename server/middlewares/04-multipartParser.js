'use strict';
const parse = require('co-busboy');
const fs = require('fs');
const crypto = require('crypto');

module.exports = function*(next){
  if(!this.request.is('multipart/*')) return yield* next;


  let parts = parse(this, {autoFields: true});

  let part;
  let random = crypto.randomBytes(4).readUInt32LE(0);
  let filename;
  while (part = yield parts) {
    filename = part.filename;
    part.pipe(fs.createWriteStream('./static/images/' + random + '.' + filename));
  }

  this.request.body = parts.field;
  this.request.body.image = '/static/images/' + random + '.' + filename;
  yield* next;
};