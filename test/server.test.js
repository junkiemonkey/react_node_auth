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


  describe('User REST API', function(){

  });


  describe('News REST API', function(){
    let existNewsData = {
      title: 'News title',
      text: 'News text',
      slug: 'News-title'
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

    describe('CREATE NEWS', function(){
      it('POST /news/', function*(){
        let res = yield request({
          method: 'POST',
          url: getURL('/news/'),
          json: true,
          body: newNewsData
        });
        // console.log(response.body);
        res.body.title.should.exist;
        res.body.text.should.exist;
        res.body.slug.should.exist;
      });
      it('POST /news/ -- existing title', function* () {
        let res = yield request({
          method: 'POST',
          url: getURL('/news/'),
          json: true,
          body: {
            title: 'News title',
            text: 'News text',
          }
        });
        res.statusCode.should.equal(400);
        res.body.error.should.exist;
        res.body.error.should.be.String();
      })
    })



    describe('UPDATE NEWS', function(){
      it('PATCH /news/:slug', function* () {
        let res = yield request({
          method: 'PATCH',
          url: getURL(`/news/${existingNews.slug}`),
          json: true,
          body: {
            title: 'ZEUS title',
            text: 'text'
          }
        });
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.match(/application\/json/);
        res.body.title.should.equal('ZEUS title');
        res.body.text.should.equal('text');
        res.body.slug.should.equal('ZEUS-title');
        res.body._id.should.eql(existingNews.id);
      });
      it('PATCH /news/:slug - exist news title', function*(){
        yield request({
          method: 'POST',
          url: getURL('/news/'),
          json: true,
          body: {
            title: 'another news',
            text: 'text'
          }
        });
        let res = yield request({
          method: 'PATCH',
          url: getURL(`/news/${existingNews.slug}`),
          json: true,
          body: {
            title: 'another news',
            text: 'text'
          }
        });
        console.log(res.body);
        res.statusCode.should.equal(400);
        res.body.error.should.exist;
        res.body.error.should.be.String();
      });
    });



    it('DELETE NEWS', function*(){
      let response = yield request.del(getURL(`/news/${existingNews._id}`));
      response.statusCode.should.be.equal(200);
      response.body.should.be.String();
    });

    it('GET /', function*(){
      let response = yield request.get(getURL('/news/'));
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
      JSON.parse(response.body).length.should.eql(1);
    });
  });
});


