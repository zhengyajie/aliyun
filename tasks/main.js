/**
 * Created by Administrator on 2017/3/5.
 */
/*
    思路：
         1写一个read模块，用来传入url地值，返回读取后的对象数组
         2把上面的对象数组保存在数据库中的mongodb
         3简历一个web服务器显示保存的数据库
         4开启一个计划任务每小时更新一次数据库
         5把此项目发布github并且不熟阿里云上
*/


var read= require('./read').movie;
var write= require('./write').movie;
var async = require('async');
/* 串行的 read 和write   */

var debug = require('debug')('crawl:main');//左边是项目的名字:右边是日志的名字

var url='http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';

var Movie = require('../model').Movie;
async.waterfall([
    //在保存之前全部清空数据
    function(callback){ //为了让数据库清空一下才加的这个函数
      Movie.remove({},callback);
    },

    function(callback){
      read(url,callback);//这个里面返回的就是movies
    },
    function(movies,callback){
       write(movies,callback);
    }
],function(err,result){
    debug('全部任务执行完毕');
});