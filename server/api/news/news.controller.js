const News = require('../../models/news');
const slug = require('slugify');
const mongoose = require('../../db/mongoose');

exports.getAllNews = function*(next){
  var newslist = yield News.find({}).lean();
  this.statusCode = 200;
  this.body = newslist;
}

exports.saveNews = function*(next){
  var data = this.request.body;
  data.slug = slug(data.title);
  var new_news = yield News.create(data);
  this.body = new_news.toObject();
}

exports.newsById = function*(id, next){
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.throw(404);
  }
  this.newsById = yield News.findById(id);
  if (!this.newsById) {
    this.throw(404);
  }
  yield* next;
}

exports.deleteNews = function*(next){
  yield this.newsById.remove();
  this.body = 'Item deleted successfully!';
}