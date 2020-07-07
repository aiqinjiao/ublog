// 引用express框架
const express = require('express');

// 创建博客展示页面路由
const admin = express.Router();

// 登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 用户列表
admin.get('/user', require('./admin/userPage'));

// 用户编辑
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现添加用户功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 用户修改
admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表
admin.get('/article', require('./admin/article'));

// 文章编辑
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));

// 实现文章编辑功能的路由
admin.post('/article-modify', require('./admin/article-modify'));

// 实现文章删除功能的路由
admin.get('/article-delete', require('./admin/article-delete'));

// 将路由对象作为模块成员进行导出
module.exports = admin;