<template>

  <div class="cate">
      <!-- 顶部栏 -->
            <van-nav-bar
              title="分类"
              left-text="返回"
              left-arrow
              fiexd
              @click-left="onClickLeft"
            />


    <div class="cate-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item 
          v-for='item in cateArr'
          :key='item._id'
          :title="item.cate_zh"
           />
        </van-sidebar>
    </div>
    <div class="cate-right">
        <van-grid  :column-num="3">
          <van-grid-item v-for='item in goodlist'
          :key='item._id'
          >
            <van-image :src='img.imgBaseUrl+item.img' />
            <div class="good-name" v-text='item.name'></div>
          </van-grid-item>
        </van-grid>
    </div>
    <!-- 底部 -->
    <Tabbar/>
  </div>
  
</template>

<script>
import {Tabbar} from '../../components/index.js';
import { mapState ,mapMutations} from 'vuex';
import img from '@/utils/img';
import{
  Sidebar, 
  SidebarItem,
  Grid, 
  GridItem,
  Image,
  NavBar,
} from 'vant'
export default {
    name:'Cate',
    components:{
      Tabbar,
      [Sidebar.name]:Sidebar,
      [SidebarItem.name]:SidebarItem,
      [Grid.name]:Grid,
      [GridItem.name]:GridItem,
      [Image.name]:Image,
      [NavBar.name]:NavBar

    },
    data:function(){
      return {
        activeKey:0,
        cateArr:[],
        goodlist:[],
        img,
      }

    },
    mounted(){
      this.init()
    },
    watch:{
        activeKey(){
              this.getList(this.cateArr[this.activeKey].cate)
              console.log(this.cateArr[this.activeKey].cate)
        }
    },
    computed:{
      ...mapState('CateGoodList',['cateObj']),
      // activeKey:()=>{
      //       return  this.getList(this.cateArr[this.activeKey].cate)
      //       }

    },
    methods:{
      ...mapMutations('CateGoodList',['updataCateObj']),
      //页面初始化阶段
      async init(){
          this.cateArr= await this.$api.CateGoodList({})
          this.cateArr=this.cateArr.list
          // console.log(this.cateArr)
          this.getList(this.cateArr[0].cate);
      },
      getList(cate){

        if(this.cateObj[this.activeKey]){//判断cateObj中有没有缓存数据
          this.goodlist=this.cateObj[this.activeKey]
        }else{
                  this.$api.CateGoodListScreen({cate}).then(
                    res=>{
                        this.goodlist=res.list;
                        console.log('this.goodlist',this.goodlist)
                        this.updataCateObj({
                        idx:this.activeKey,
                        arr:res.list
                        })
                  })
        }
      },
      onClickLeft(){
        this.$router.push('/')
      }
      

    },
}
</script>

<style lang='scss' scoped>
  
  .cate{
    // position:relative;
    // height:100%;
    .van-nav-bar{
      position:fixed;
      width:100%;
      top:0;
    }
    .cate-left{
      position: absolute;
      top: 0;
      left: 0;
      margin: 1.226667rem 0;
      // bottom: 1.33rem;
      width: 2.27rem;
      height:100%;
      
      overflow: auto;
    }
    .cate-right{
      position: absolute;
      top: 0;
      // bottom: 1.33rem;
      right: 0;
      margin: 1.226667rem 0;
      width: calc(100% - 2.27rem);
      overflow: auto;
      height: 100%;
      .good-name{
        font-size: .32rem;
        color: #333333;
        line-height: .64rem;
        padding-top: .27rem;

      }
    }
  }
</style>