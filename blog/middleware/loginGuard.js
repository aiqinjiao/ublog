const guard = (req, res, next) => {
    // 判断用户访问的是否登录页面
    // 判断用户的登录状态
    // 如果用户是登录的　将请求放行
    // 如果用户不是登录的　将请求重定向到登录页面
    // req.session.username 不存在，就是没有登录的

    if (req.url == '/logout') {
        next();
    } else if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户是登录状态  且是普通用户
        if (req.session.role == 'normal') {
            // 重定向到博客首页 
            // return 终止程序向下执行
            return res.redirect('/home/');
        }
        // 用户是登录状态　将请求放行
        next();
    }
};

module.exports = guard;