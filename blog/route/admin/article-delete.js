const { Article } = require('../../model/article');
module.exports = async (req, res) => {
    // 获取要删除的文章id
    let id = req.query.id;
    // 根据文章id删除数据
    await Article.findOneAndDelete({ _id: id });
    // 重定向到文章列表页面
    res.redirect('/admin/article');
}