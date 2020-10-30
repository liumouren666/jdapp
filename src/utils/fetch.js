import axios from 'axios';

// const baseURL = 'https://cnodejs.org/api/v1'

const baseURL = 'http://localhost:8085'  // 本地服务器
const version='/api/v1'


//创建axios实例
const fetch=axios.create({
    baseURL:baseURL+version,//api服务器的方法；
    timeout:7000,//设置超时的时间
    headers:{}//请求头
})
//封装请求拦截器
fetch.interceptors.request.use(
        function(config){
            config.headers.Authorization = localStorage.getItem('token')
        return config//开启请求开关
    },function(error){
        return Promise.reject(error);
    }
)


//封装响应拦截器

fetch.interceptors.response.use(
    function(response){
        let res=null;
        if(response.status==200){
            if(response.data && response.data.err === 0){
                res=response.data.data
            }else{
                console.log("超时了或者网络错误")
            }
        }
        return res;
    },
    function(error){
        return Promise.reject(error);
    }
)

export default fetch;