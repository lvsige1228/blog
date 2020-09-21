 const {loginCheck} = require('../controller/user');
//导入成功和失败的模块
const {ErrorModel, SuccessModel} = require('../model/resModel');

const handleUserRouter = (req, res) => {
    const method = req.method; //GET POST

    // 登录
    if (method === 'POST' && req.path === '/api/blog/login') {
        // console.log(req)
       /* //解构赋值
        const {username, password} = req.body;
        const result = loginCheck(username, password);
        return result.then(data => {
            if (data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })*/
    }


    //登录验证测试
   /* if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('还没登录'))
    }*/
};
module.exports = handleUserRouter;
