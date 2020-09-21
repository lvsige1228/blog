const {getList, getDetail, newBlog,updateBlog,delBlog} = require('../controller/blog');
const {ErrorModel, SuccessModel} = require('../model/resModel');
/**
 * 路由模块只处理路由 把参数传递给controller 成功 和失败 不关心数据信息是怎样处理的
 */

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET POST

    const id = req.query.id; //id通用
    // console.log(req);

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        /*const listData = getList(author, keyword);
        //返回errno:0  / -1
        return new SuccessModel(listData)*/
        //执行 getList 返回一个promise
        const result = getList(author, keyword);
      return result.then(listData=>{  //返回promise
            return new SuccessModel(listData)
        })
    }
    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
       /* const data = getDetail(id);
        return new SuccessModel(data);*/

        const result = getDetail(id);
        return result.then(data=>{
            return new SuccessModel(data);
        })
    }

    //新建一篇
    if (method === 'POST' && req.path === '/api/blog/new') {
       /* const data = newBlog(req.body);
        return new SuccessModel(data)*/
        // req.body.author = 'lvsige'; //暂时假数据
        // console.log(req.body)
        const result = newBlog(req.body);
        return result.then(data=>{
            return new SuccessModel(data);
        })

    }
    //更新一篇
    if (method === 'POST' && req.path === '/api/blog/update') {
        //id 上面的公用id  req.body 在app里定义的
        const result = updateBlog(id,req.body);
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else {
                return new ErrorModel('更新博客失败')
            }
        });

    }
    //删除一篇
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'zhangsan'; //假数据
         const result = delBlog(id,author);
         return  result.then(val=>{
             if(val){
                 return  new SuccessModel()
             }else {
                 return new ErrorModel('删除失败')
             }
         })

    }
};
module.exports = handleBlogRouter;
