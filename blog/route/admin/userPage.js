// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {

    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传过来的当前页参数
    // 如果没有传入页码，默认是第一页
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 5;
    // 查询用户数据的总数
    let count = await User.countDocuments({});
    // 总页数 math.ceil() 向上取整
    let total = Math.ceil(count / pagesize);

    // 页码对应的数据查询开赛位置
    let start = (page - 1) * pagesize;

    // limit(2) limit限制查询的数量 传入每页显示的数据数量
    // skip(2) skip跳过多少条数据 传入显示数据的开始位置
    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);

    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}