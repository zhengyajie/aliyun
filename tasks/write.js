/**
 * Created by Administrator on 2017/3/5.
 */

/*var request = require('request');
var iconv = require('iconv');
var cheerio = require('cheerio');*/
var Movie = require('../model').Movie;
var async = require('async');
var debug = require('debug')('crawl:write');//左边是项目的名字:右边是日志的名字

exports.movie = function(movies,callback){
    //异步
    async.forEach(movies,function(item,cb){
        debug(`保存电影:${item.name}`);
        //console.log(arguments)
        Movie.create(item,cb)
    },callback);
};