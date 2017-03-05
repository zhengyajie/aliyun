/**
 * Created by Administrator on 2017/3/5.
 */
var express = require('express');
var Movie = require('./model').Movie;//引入movie这个模型
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname)));

//设置模板引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);

app.get('/',function(req,res){
    Movie.find({},function(err,movies){
        res.render('index',{movies});
    })
});

app.listen(80);