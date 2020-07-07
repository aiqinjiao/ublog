const { Article } = require('../../model/article');
// 引入formidable第三方模块 解析表单，支持get post 请求参数， 文件上传
const formidable = require('formidable');
const path = require('path');
module.exports = (req, res, next) => {
    // 获取修改文章的id
    const id = req.query.id;
    // // 获取修改提交的参数
    // const { title, author, publishDate, cover, content } = req.body;

    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置文件上传的路径
    form.uploadDir = path.join(__dirname, '../../public/uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async (err, fields, files) => {
        // res.send(req.app.locals.userInfo);
        // 将修改的消息保存到数据库
        // 判断提交修改的用户是否是文章作者
        if (fields.author == req.app.locals.userInfo._id) {
            await Article.updateOne({ _id: id }, {
                title: fields.title,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            });
            // 将页面重定向到文章列表页面
            res.redirect('/admin/article');
        } else {
            let obj = {
                path: '/admin/article-edit',
                message: '没有修改该文章的权限',
                id: id
            };
            next(JSON.stringify(obj));
        }
    });
}