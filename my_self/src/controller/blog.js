//只处理数据的信息
const {exec} = require('../db/mysql');
//获取博客列表
const getList = (author, keyword) => {
    // 1=1 -- 因为author和keyword 不确定有  加上1=1  防止出错
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author = '${author}' ` //注意空格
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' ` // 注意空格
    }
    // sql += `order by createtime desc`;
    //返回 promise
    return exec(sql)
};
//博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id = '${id}' `;
    // 数组
    return exec(sql).then(rows => {
        return rows[0];
    })
};

//新建博客
const newBlog = (blogData) => {
    //blogData 博客对象 包含title等  //表示新建博客。插入到数据表的id'
    /*const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createtime = Date.now();*/
    const title = '滴滴';
    const content = '滴滴';
    const author = '滴滴';
    const createtime = Date.now();
    const sql = `
        insert into blogs (title,content,createtime,author)
        values ('${title}', '${content}' , ${createtime}, '${author}')
     `;
    return exec(sql).then(res=>{
        // insertId 本次插入的id
        // console.log(res);
        return {
            id:res.insertId
        }
    })
};
//更新博客
const updateBlog = (id, blogData = {}) => {
    //blogData 博客对象 包含title等
    // id 要更新的id
     const title = blogData.title;
     const content = blogData.content;
     const  sql = `
      update blogs set title='${title}', content='${content}' where id='${id}'
     `;
    return exec(sql).then(updateData=>{
        console.log(updateData);
        //影响行数 发生变化 说明修改成功
        return updateData.affectedRows > 0;

    })
};
//删除博客
const delBlog = (id,author) => {
    // id 要删除的id
     const sql  = `
        delete from blogs where id='${id}' and author='${author}'
     `;
    return exec(sql).then(delData=>{
        // console.log(delData);
        //影响行数 发生变化 说明删除成功
        return delData.affectedRows > 0;
    })
};
//导出
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};