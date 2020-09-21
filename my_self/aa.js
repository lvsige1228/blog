const mysql = require('mysql');

//创建链接对象
const con = mysql.createConnection({
    host: '127.0.0.1',  //域
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog', //我们使用的数据库
});
//开始连接

con.connect();
//执行sql语句
const sql = 'select * from users';
con.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(result)
});
//关闭链接
con.end();