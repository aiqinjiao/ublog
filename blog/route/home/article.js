const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 接受客户端传递过来的文章id
    const id = req.query.id;
    // 根据文章id查询文章详情
    let article = await Article.findOne({ _id: id }).populate('author');

    // 查询当前文章对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');

    // 渲染文章详情页面
    res.render('home/article', { article, comments });
};