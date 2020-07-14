// 引入mongoose模块
const mongoose = require('mongoose');
const { string, date } = require('joi');
const { User } = require('./user');

// 创建文章集合规则
const articleSchame = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        // 没有日期，展示位当前日期
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

// 根据规则创建集合
const Article = mongoose.model('Article', articleSchame);

// 将集合规则作为模板成员进行导出
module.exports = {
    // Article: Article
    Article
}