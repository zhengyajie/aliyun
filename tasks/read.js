/**
 * Created by Administrator on 2017/3/5.
 */
    //  这个就是用爬虫的方法爬一个页面。

// 传入url地值返回对象数组
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');//左边是项目的名字:右边是日志的名字

exports.movie = function(url,callback){
    //请求网址内容
    request({url,encoding:null},function(err,response,body){
        // 实现在一个转码，把gbk编码的buffer转成utf8格式的字符串
        body=iconv.decode(body,'gbk');
        //把此响应题字符串转成$对象
        var $ = cheerio.load(body);
        var movies =[];
        $('.keyword .list-title').each(function(){
            //吧当前对象转成jquery对象
            var $me=$(this);
            //声明一个电影对象，一个是标签文本对应的电影名称，一个是href属性指向url地址
            var movie ={
                name:$me.text(),
                url:$me.attr('href')
            };
            debug(`读到电影:${movie.name}`);
            movies.push(movie)
        });
        console.log(movies);
        callback(err,movies)
    });
};
/*
exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function(err,movies){console.log(movies)});
*/
// 这个就是数组  然后就是一堆数据