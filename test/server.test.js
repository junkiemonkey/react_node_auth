"use strict";

const server = require('../server');
const request = require('co-request');
const expect = require('chai').expect;
const assert = require('chai').assert;

var User = require('../server/models/user');
var News = require('../server/models/news');

function getURL(path){
  return `http://localhost:3000/api${path}`;
}

describe('REST API SERVER', function(){

  // before(function(done){
  //   app.listen(3000, done);
  // });

  // after(function(done) {
  //   server.close(done);
  // });


  describe('User REST API', function(){

  });


  describe('News REST API', function(){
    let existNewsData = {
      title: 'News title',
      text: 'News text',
      slug: 'news-title'
    };
    let newNewsData = {
      title: 'New News Title',
      text: 'New text'
    };
    let existingNews;
    beforeEach(function*(){
      yield News.remove();
      existingNews = yield News.create(existNewsData);
    });

    it('CREATE NEWS', function*(){
      let response = yield request({
        method: 'POST',
        url: getURL('/news/'),
        json: true,
        body: newNewsData
      });
      // console.log(response.body);
      response.body.title.should.exist;
      response.body.text.should.exist;
      response.body.slug.should.exist;
    });

    it('DELETE NEWS', function*(){
      let response = yield request.del(getURL(`/news/${existingNews._id}`));
      response.statusCode.should.equal(200);
      response.body.should.be.String();
    });

    it('GET /', function*(){
      let response = yield request.get(getURL('/news/'));
      // assert.equal(response.statusCode, 200, 'its OK!');
      // assert.match(response.headers['content-type'], /application\/json/, 'Content type matched!')
      // assert.equal(JSON.parse(response.body).length, 1, 'JSON length is OK')
      // expect(response.statusCode).to.equal(200);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
      JSON.parse(response.body).length.should.eql(1);
    });
  });
});


