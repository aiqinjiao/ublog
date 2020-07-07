// 引入文章管理集合构造函数
const { Article } = require('../../model/article');
module.exports = async (req, res) => {

    // 标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 获取地址栏中的id参数
    const { message, id } = req.query;

    // 如果传递了id
    if (id) {
        // 查询当前修改的文章
        let article = await Article.findOne({ _id: id });
        // 渲染文章编辑页面
        res.render('admin/article-edit', {
            article: article,
            button: '修改',
            link: '/admin/article-modify?id=' + id,
            message: message
        })
    } else {
        res.render('admin/article-edit', {
            button: '新增',
            link: '/admin/article-add',
            message: message
        });
    }


}