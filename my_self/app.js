const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');


// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});  //如果是get请求 返回空
            return
        }
        // console.log('content-type',req.headers['content-type']);
        //如果返回的不是 json格式
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return
        }

        //是post请求
        let postData = '';
        req.on('data',chunk=>{
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {  //数据为空 则返回空对象
                resolve({});
                return
            }
            resolve(JSON.parse(postData));
        });

    });
    return promise;
};




const serverHandle = (req, res) => {
    //设置返回格式 JSON、
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin","*");
    /*星号表示所有的异域请求都可以接受，*/
    res.setHeader("Access-Control-Allow-Methods","GET","POST");
    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query  get请求
    req.query = querystring.parse(url.split('?')[1]);

    // ----------------------------------------------------------------
    //解析cookie
    req.cookie = {};
    const   cookieStr = req.headers.cookie || ''; //k1=v1;k2=v2
    //解析回来的格式k1=v1;k2=v2 我们把它变成对象的形式 首先通过;分隔
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return
        }
        // 通过=分割 第一个时键  第二个是值
        const arr = item.split('=');
        const key = arr[0];
        const value = arr[1];
        req.cookie[key] = value;
    });
    // console.log(req.cookie);
    // ---------------------------------------------------------------
    // 解析 post
    getPostData(req).then(postData =>{
        req.body = postData;
        console.log(postData)
    });
        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                );
            });
            return
        }

        //处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                );
            })
        }

        //未命中路由返回404
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404');
        res.end()


};

module.exports = serverHandle;