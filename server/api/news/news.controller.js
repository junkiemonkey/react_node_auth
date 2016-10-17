const News = require('../../models/news');

exports.getAllNews = function*(next){
  var newslist = yield News.find({}).lean();
  this.statusCode = 200;
  this.body = newslist;
}