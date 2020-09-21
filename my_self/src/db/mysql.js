const mysql = require('mysql');
// const {MYSQL_CONF} =require('../conf/db')
//创建链接对象
const con = mysql.createConnection({
    host: 'localhost',  //域
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog',
});

//开始连接
con.connect();

// 统一 执行sql语句 的函数
function exec(sql) {
    //promise
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    });
}
 module.exports = {
    exec
 };