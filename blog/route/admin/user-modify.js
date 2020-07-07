const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接收客户端传递过来的请求参数
    // req.body 拿到post请求参数
    // req.query 拿到get请求参数
    const { username, password, email, role, state } = req.body;
    // 即将要修改的用户id
    const id = req.query.id;

    // 获取修改用户信息输入的密码
    // 判断密码是否正确
    // 通过变量的方式接收处理的返回值，要用异步函数进行处理
    let user = await User.findOne({ _id: id });
    // 进行密码比对 2个参数 1。要比对的密码 2。数据库中加密的密码  返回 boolean
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        // 比对密码成功
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 比对密码失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败，不能进行用户信息的修改',
            id: id
        };
        next(JSON.stringify(obj));
    }
}