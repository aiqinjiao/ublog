// 引用express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser，用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-template模板引擎
const template = require('art-template');
// 导入dateformat第三方模块 处理日期格式数据
const dateFormat = require('dateformat');

// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        // cookie 过期时间1小时
        maxAge: 1 * 60 * 60 * 1000
    }
}));

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'html');
// 当渲染后缀为html的模板是，所使用的模板引擎是什么
app.engine('html', require('express-art-template'));
// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求，判断用户是否登录状态
app.use('/admin', require('./middleware/loginGuard'));

app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    // ?后面有多个参数拼接
    let parmas = [];
    for (let attr in result) {
        if (attr != 'path') {
            parmas.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${parmas.join('&')}`);
});

// 监听端口
app.listen(80);
console.log('网站服务器启动成功, 请访问localhost');