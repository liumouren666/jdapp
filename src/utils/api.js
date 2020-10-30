import fetch from './fetch';
//获取首页商品
export function HomeGoodListPost(params){
    return fetch({
        url:'/jd/good/list',
        method:"GET",
        params,
    })
    
}
//获取cate页的缓存商品
export function CateGoodList(params){
    return fetch({
        url:'/jd/cates',
        method:"GET",
        params,
    })
    
}
//获取基于品类进行筛选

export function CateGoodListScreen(params){
    return fetch({
        url:'/jd/good/list',
        method:"GET",
        params,
    })
    
}
//登入
export function fetchLogin(data){
    return fetch({
        url:'/users/login',
        method:"POST",
        data,
    })
    
}
//注册
export function fetchRegister(data){
    return fetch({
        url:'/users/register',
        method:"POST",
        data,
    })
}

//获取商品详情
export function getDetail(params){
    return fetch({
        url:'/jd/good/detail',
        method:"GET",
        params,
    })
    
}
//添加到购物车
export function getCartGoods(data){
    return fetch({
        url:'/jd/cart/add',
        method:"POST",
        data,
    })
}
//获取购物车列表：

export function getGoodLists(params){
    return fetch({
        url:'/jd/cart/list',
        method:"GET",
        params,
    })
}
//更改购物车中的商品数量：/jd/updateCartNum
export function changeCartNum(data){
    return fetch({
        url:'/jd/updateCartNum',
        method:"POST",
        data,
    })
}
//删除购物车中的商品：/jd/deleteToCart
export function delGoods(params){
    return fetch({
        url:'/jd/deleteToCart',
        method:"GET",
        params,
    })
    
}
//提交购物：/jd/submitToCart

export function submitGoods(data){
    return fetch({
        url:'/jd/submitToCart',
        method:"POST",
        data,
    })
}






export default {
    HomeGoodListPost,
    CateGoodList,
    CateGoodListScreen,
    fetchRegister,
    fetchLogin,
    getDetail,
    getCartGoods,
    getGoodLists,
    changeCartNum,
    delGoods,
    submitGoods

}