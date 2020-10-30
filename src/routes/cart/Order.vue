<template>
    <div class="Order">
        <!-- 顶部 -->
        <van-nav-bar
            title="标题"
            left-text="返回"
            right-text="购物车"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <!-- 下单商品 -->
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />



    </div>
</template>

<script>
// import{
// NavBar
// } from 'Vant'

import {
NavBar,
Card
} from 'vant';


export default {
    name:"Order",
    components:{
        [NavBar.name]:NavBar,
        [Card.name]:Card
    },
    methods:{
        onClickLeft(){
            this.$router.push('/user')
        },
        onClickRight(){
            this.$router.push('/cart')
        }

    },
    mounted(){
        
    }

}
</script>

<style>

</style>