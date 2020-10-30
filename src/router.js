import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Home = ()=>import('@/routes/home/Home.vue')
const Cate = ()=>import('@/routes/cate/Cate.vue')
const Cart = ()=>import('@/routes/cart/Cart.vue')
const User = ()=>import('@/routes/user/User.vue')
const Login =()=>import('@/routes/user/Login.vue')
const Register=()=>import('@/routes/user/Register.vue')
const GoodDetail=()=>import('@/routes/home/GoodDetail.vue')
const Order=()=>import('@/routes/cart/Order.vue')
const Address=()=>import('@/routes/user/Address.vue')
const AddressList=()=>import('@/routes/user/AddressList.vue')



const router= new VueRouter({
    mode:'hash',
    routes:[
        { path:'/',components:{alive:Home}},
        { path:'/cate',components:{alive:Cate}},
        { path:'/user',components:{alive:User}},

        
        { path:'/cart',component:Cart},
        { path:'/login',component:Login},
        { path:'/register',component:Register},
        { path:'/detail/:id',component:GoodDetail},
        { path:'/order',component:Order},
        { path:'/address',component:Address},
        { path:'/addresslist',component:AddressList}
        // { path:'/*',redirect:'/'}

    ]

})
// 全局的路由守卫
router.beforeEach((to, from, next)=>{
    // 仅对购物车页面进行拦截
    if(to.path === '/cart') {
      // 用token表示用户是否已经登录
      let token = localStorage.getItem('token')
      if(token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
  

export default router