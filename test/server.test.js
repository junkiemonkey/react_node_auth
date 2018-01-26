"use strict";

var server = require('../server');
var request = require('co-request');
var expect = require('chai').expect;
var assert = require('chai').assert;

var User = require('../server/models/user');
var News = require('../server/models/news');

function getURL(path){
  return 'http://127.0.0.1:8080/api' + path;
}

describe('REST API SERVER', function(){


  describe('User REST API', function(){

  });


  describe('News REST API', function(){
    var img = '/static/images/img.jpg';
    var text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequatur distinctio dolores doloribus eius expedita explicabo iste neque nostrum omnis perferendis repellat sunt, tenetur? Eum excepturi facilis fugiat minima possimus quos? Deleniti dolores error laborum modi numquam. Aliquid amet atque, beatae blanditiis corporis debitis deserunt distinctio doloribus ea error est eveniet impedit incidunt molestiae molestias necessitatibus nesciunt nobis numquam officiis optio perspiciatis porro quaerat quasi quibusdam quisquam rem sapiente suscipit, ut voluptatibus voluptatum. Autem eveniet excepturi, inventore quae quam quasi quo sed voluptatum? Aliquid, beatae commodi doloribus facilis labore magni molestiae nostrum quidem reprehenderit ullam velit voluptatibus. Accusantium aspernatur assumenda cum et ex explicabo, incidunt ipsum maxime molestiae molestias natus nihil nisi obcaecati perferendis quam recusandae sed sint sit? Aspernatur, at commodi consequatur consequuntur delectus deserunt incidunt nam quae quam recusandae rem repellendus soluta, tenetur ut veritatis! At beatae blanditiis consequuntur culpa cum dicta dolores eaque error esse ex fugit incidunt, ipsum iste itaque laboriosam magni nemo officiis placeat porro quasi quia quibusdam quos ratione sed sit tempore tenetur totam vel veritatis voluptatibus. Expedita fuga omnis porro repellat veritatis voluptas, voluptatem voluptates voluptatibus. Blanditiis cumque delectus deleniti, eos impedit iure magni molestiae natus nisi numquam officia, quam quas ut vero!'
    var existNewsData = {
      title: 'News title',
      text: text,
      image: img,
      slug: 'News-title',
      author: 'ilya'
    };
    var newNewsData = {
      title: 'New News Title',
      text: text,
      image: img,
      username: 'ilya'
    };
    var existingNews;
    beforeEach(function*(){
      yield News.remove();
      existingNews = yield News.create(existNewsData);
    });

    describe('CREATE NEWS', function(){
      it('POST /news/', function*(){
        var res = yield request({
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
        var res = yield request({
          method: 'POST',
          url: getURL('/news/'),
          json: true,
          body: {
            title: 'News title',
            text: text,
            image: img
          }
        });
        res.statusCode.should.equal(400);
        res.body.error.should.exist;
        res.body.error.should.be.String();
      })
    })



    describe('UPDATE NEWS', function(){
      it('PATCH /news/:slug', function* () {
        var res = yield request({
          method: 'PATCH',
          url: getURL(`/news/${existingNews.slug}`),
          json: true,
          body: {
            title: 'ZEUS title',
            text: text,
            image: img
          }
        });
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.match(/application\/json/);
        res.body.title.should.equal('ZEUS title');
        res.body.text.should.equal(text);
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
            text: text,
            image: img
          }
        });
        var res = yield request({
          method: 'PATCH',
          url: getURL(`/news/${existingNews.slug}`),
          json: true,
          body: {
            title: 'another news',
            text: text,
            image: img
          }
        });
        console.log(res.body);
        res.statusCode.should.equal(400);
        res.body.error.should.exist;
        res.body.error.should.be.String();
      });
    });



    it('DELETE NEWS', function*(){
      var response = yield request.del(getURL(`/news/${existingNews._id}`));
      response.statusCode.should.be.equal(200);
      response.body.should.be.String();
    });

    it('GET /', function*(){
      var response = yield request.get(getURL('/news/'));
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
      JSON.parse(response.body).length.should.eql(1);
    });
  });
});


