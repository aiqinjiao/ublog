const mongoose = require('mongoose')

// 创建文章集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 评论人用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }

});
// 根据规则创建文章集合
const Comment = mongoose.model('Comment', commentSchema);

// 将集合规则作为模板成员导出
module.exports = {
    Comment
}