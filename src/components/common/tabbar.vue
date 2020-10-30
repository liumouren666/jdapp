<template>
    <div class="tabbar">
        <van-tabbar route>
            <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
            <van-tabbar-item icon="search" to='/cate'>分类</van-tabbar-item>
            <van-tabbar-item icon="friends-o" :badge="nums" to='/cart'>购物车</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to='/user'>我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar,TabbarItem} from 'vant';
import { mapState,mapActions} from 'vuex'
export default {
    name:'Tabbar',
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
    mounted(){
        this.getnew({})
    },
    computed:{
        ...mapState('tabbarChange',['nums'])
    },
    methods:{
        ...mapActions('tabbarChange',['getnew'])
    }
}
</script>

<style lang='scss' scoped>
.tabbar{
    margin-top:1.866667rem;
}
</style>