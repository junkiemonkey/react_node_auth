'use strict';
const News = require('../../models/news');
const slug = require('slugify');
const mongoose = require('../../db/mongoose');

exports.getAllNews = function*(next){
  var newslist = yield News.find({}).lean();
  this.statusCode = 200;
  this.body = newslist;
};

exports.getOneNews = function*(next){
  if(!this.newsBySlug) this.throw(404, 'News not found!');
  this.body = this.newsBySlug;
};

exports.saveNews = function*(next){
  const data = this.request.body;
  const ctx = this;
  data.slug = slug(data.title);
  let check = yield News.count({slug: data.slug}, function(err){
    if(err) ctx.throw(err);
  });
  if(check) this.throw(400, 'Title must be a uniq field!');
  yield News.count(function(err, count){
    if(count>=10) ctx.throw(500, 'Database is full');
  });
  var new_news = yield News.create(data);
  this.body = new_news.toObject();
};

exports.newsById = function*(id, next){
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.throw(404);
  }
  this.newsById = yield News.findById(id);
  if (!this.newsById) {
    this.throw(404);
  }
  yield* next;
};

exports.newsBySlug = function* (slug, next) {
  if(!slug) this.throw(400);
  this.slug = slug;
  this.newsBySlug = yield News.findOne({slug:slug});
  yield* next;
};

exports.deleteNews = function*(next){
  yield this.newsById.remove();
  this.body = 'Item deleted successfully!';
};

exports.updateNews = function* (next) {
  const data = this.request.body;
  const newData = {};
  const ctx = this;
  if(data.title.length){
    newData.title = data.title;
    newData.slug = slug(data.title);
  }
  if(data.text.length){
    newData.text = data.text;
  }

  if(newData.slug){
    let check = yield News.count({slug: newData.slug}, function(err){
      if(err) ctx.throw(err);
    });
    if(check) this.throw(400, 'Title must be a uniq field!');
  }

  var updated_news = yield News.findOneAndUpdate({
    slug: this.slug
  },{
    $set: newData
  }, {
    new: true
  });

  this.body = updated_news.toObject();

};