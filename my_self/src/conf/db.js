//获取环境变量 nodejs进程的一些信息-->process
const env = process.env.NODE_ENV;

//配置
let MYSQL_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',  //域
        user: 'root',
        password: '123',
        port: '3306',
        database: 'myblog', //我们使用的数据库
    }
}
//实际中 线上的  在模拟
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',  //域
        user: 'root',
        password: '123',
        port: '3306',
        database: 'myblog',
    }
}

module.exports = {
    MYSQL_CONF
};