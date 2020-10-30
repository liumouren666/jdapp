<template>
  <div class="good-detail">
      <!-- 返回栏 -->
      <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="returnHome">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
      </van-nav-bar>
      <!-- 商品详情 -->
      <div class="goodsitem">
          <img :src="img.imgBaseUrl+info.img" alt="">
          <div>
              <span>￥</span>
              <span v-text='info.price'></span>
              <span>元</span>
          </div>
      </div>
      <!-- 购买按钮 -->
      <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" @click='buy' />
       </van-goods-action>
  </div>

</template>

<script>
import {
    mapMutations
} from 'vuex'
import {
    NavBar,
    Icon,
    GoodsAction, 
    GoodsActionIcon, 
    GoodsActionButton

} from 'vant';
import img from '@/utils/img'
export default {
    name:"GoodDetail",
    components:{
        [NavBar.name]:NavBar,
        [Icon.name]:Icon,
        [GoodsAction.name]:GoodsAction,
        [GoodsActionIcon.name]:GoodsActionIcon,
        [GoodsActionButton.name]:GoodsActionButton
    },
    data:function(){
        return {
            info:{},
            img
        }
    },
    mounted(){
        this.$api.getDetail({id:this.$route.params.id}).then(res=>{
            this.info=res
            console.log("res",res)
        })
    },
    methods:{
        ...mapMutations('tabbarChange',['updataNums']),
        returnHome(){
            this.$router.back('/')
        },
        buy(){
            console.log(111);
            const data={
                num:1,
                good_id:this.info._id
            }
            this.$api.getCartGoods(data).then(res=>{
                console.log('detail',res)
             if(res){
                 this.$api.getGoodLists({}).then(res=>{
                     this.updataNums(res)
                 })
                 this.$router.replace('/cart')
             }                
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .good-detail{
        .goodsitem{
            img{
                width:5rem
            }
        }
    }
</style>