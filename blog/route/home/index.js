const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 获取页码值
    const page = req.query.page;

    // 查询所有文章数据  populate 多集合联合查询
    // page 指定当前页
    // size 指定每一页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    let article = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // let article = await Article.find().populate('author');
    // res.send(article);

    // 渲染模板，并传递数据
    res.render('home/default', { article: article });
}