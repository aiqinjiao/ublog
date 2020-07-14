// 连接数据库
// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 数据库默认端口号 27017 可以省略不写
// 数据库管理员账户/密码  root/root
// blog数据库账号/密码  ublog/ublog
mongoose.connect('mongodb://ublog:ublog@localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));