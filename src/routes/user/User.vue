<template>

  <div class="user">
    <van-nav-bar
      title="个人中心"
      left-text="返回"
      right-text="登入"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
      <!-- 内容 -->
    <div class="content">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600334751382&di=93b9e650e79ac2d6b14eff06deb89b13&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg" alt="">
        <h1 v-text='list'></h1>
    </div> 

        <van-cell title="地址管理" icon="shop-o" @click="getAddress">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="van-icon-arrow" />
          </template>
        </van-cell>
                <van-cell title="账户安全" icon="shop-o">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="van-icon-arrow" />
          </template>
        </van-cell>
                <van-cell title="我的钱包" icon="shop-o">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="van-icon-arrow" />
          </template>
        </van-cell>
        <van-cell title="我的订单" icon="shop-o" @click="getGoodsPay">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="van-icon-arrow" />
          </template>
        </van-cell>


        <!-- 底部 -->
    <Tabbar/>


  </div>
</template>

<script>
import {
NavBar,
Cell,
Icon,
}from 'vant'
import {Tabbar} from '../../components/index.js';
export default {
    name:'User',
    components:{
      Tabbar,
      [NavBar.name]:NavBar,
      [Cell.name]:Cell,
      [Icon.name]:Icon
    },
    data:function(){
      return {
        list:''
      }
    },
    mounted(){
        this.list=localStorage.getItem('name')
    },
    methods:{
      onClickLeft(){
        this.$router.push('/')
      },
      onClickRight(){
        this.$router.push('/login')
      },
      getGoodsPay(){
        this.$router.push('/order')
      },
      getAddress(){
        this.$router.push('/addresslist')
      }
    }
}
</script>

<style lang='scss' scoped>
    .user{

      .content{
        width:calc(100% - 1rem);
        height:4rem;
        margin: 0.266667rem auto;
        display:flex;
        justify-content: space-around;
        align-items:center;
        border:1px solid #ccc ;
        border-radius:0.133333rem;
        font-size: 0.48rem;
        &>img{
          width: 3.5rem;
        }
      }
      .van-icon-arrow{
        display: flex;
        align-items:center
      }
    }
</style>