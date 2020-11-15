<template>
<div class="home">
    <van-pull-refresh  v-model="refreshing" @refresh="onRefresh">
            <!-- 背景 -->
            <div class="background"></div>
            <div class="top">
                <!-- 通知栏 -->
                <van-notice-bar
                left-icon="volume-o"
                mode='closeable'
                scrollable
                text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
                />
                <!-- 搜索框-->
                <div class="top-search">
                    <div class="search-icon"></div>
                    <van-search
                            shape='round'
                            show-action
                            background="#C82519"
                            disabled
                            :placeholder="searchText"
                            >
                            <template #action>
                                    <div @click="skipToLogin"
                                    class="search-btn"
                                    >登入</div>
                            </template>
                    </van-search>
                </div>
            </div>
            <!-- 轮播图 -->
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(item, index) in lunboArr" :key="index"
                >
                    <img v-lazy=item />
                </van-swipe-item>
            </van-swipe>
            <!-- 轮播图下面的图片 -->
            <div class="pic">
                    <img src="//m.360buyimg.com/mobilecms/s250x200_jfs/t1/132944/20/9619/137784/5f5b178eE4ba3b301/3c5b18f733fc8ab0.png!q70.jpg.dpg">
                    <img src="//m.360buyimg.com/mobilecms/s250x200_jfs/t1/132040/25/9458/120046/5f5b1396E6404439a/1ac51631b12422a7.png!q70.jpg.dpg" >
                    <img src="//m.360buyimg.com/mobilecms/s250x200_jfs/t1/141841/24/8216/141451/5f5b4d09E5b29a987/37b9c2fefbe42b95.png!q70.jpg.dpg">
            </div>
            <!-- 商品列表 -->
             <div class="good-list-title">
                    <img src="//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png" alt="">
            </div>
            <div class='good-list'>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    offset='50'
                    :immediate-check='false'
                >
                    <div class="good-list-row" v-for='i in row' :key='i'>
                        <GoodItem  :good='homegoodlilst[2*i-2]'  />
                        <GoodItem  :good='homegoodlilst[2*i-1]'  />
                    </div>
                </van-list>
            </div>
    </van-pull-refresh>


    <!-- 底部 -->
    <Tabbar/>

</div>
</template>

<script>
import {Tabbar,GoodItem} from '../../components/index.js';
import Vue from 'vue';
import img from '@/utils/img';
import { 
    Swipe,
    SwipeItem,
    Lazyload,
    NoticeBar,
    Search,
    List,
    PullRefresh,


} from 'vant';
Vue.use(Lazyload)
export default {
    name:'Home',
    data:function(){
        return {
                searchArr: [
                    { id: 1, text: '微波炉' },
                    { id: 2, text: '手机' },
                    { id: 3, text: '电脑' },
                    { id: 4, text: '消毒液' }
                ],
                lunboArr:[
                    '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/115456/40/7331/100669/5ec3a9c6E3dcbadb7/46071c04455c0d5b.jpg!q70.jpg.dpg',
                    '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/142547/35/7849/179012/5f5748e9E677be362/86b80918a8d2b0d8.jpg!q70.jpg.dpg',
                    '//imgcps.jd.com/ling4/52308993984/5oiQ5Lq65aW257KJ55u06ZmN/5a6J5YWo5b-r5o23/p-5f4c8e533e30c434f1b7b0b1/64a7be4e/cr_1125x445_0_171/s1125x690/q70.jpg',
                    '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/132470/4/9778/81413/5f5b59c1E62142384/ab448a08aae4fb5f.jpg!q70.jpg.dpg'
                ],
                homegoodlilst:[],
                page:1,
                //控制"下拉刷新"，true 表示正在下拉；
                refreshing:false,
                //控制"触底加载"，当它表示true表示正在触底
                loading:false,
                finished:false,
                img,
  
        }
    },
    components:{
       [Swipe.name]:Swipe,
       [SwipeItem.name]:SwipeItem,
       [NoticeBar.name]:NoticeBar,
       [Search.name]:Search,
       Tabbar,
       GoodItem,
       [List.name]:List,
       [PullRefresh.name]:PullRefresh,
    },
    computed:{
       searchText: function() {
            let idx = Math.floor(Math.random()*this.searchArr.length)
            return this.searchArr[idx].text
        },
        row:function(){
            return Math.floor(this.homegoodlilst.length / 2)
           
        }

    },
    methods:{

        getlist(){//获取首页的商品列表
            let params={
                // hot:true,
                page:this.page,
                size:6
            }
            this.$api.HomeGoodListPost(params).then(res=>{
                console.log('res',res)
                if(this.refreshing){//下拉刷新，重置数组
                    this.homegoodlilst=res.list;
                    this.refreshing=false;
                    this.finished=false;
                }else{//触底加载时触发，合并数组
                    this.homegoodlilst=[...this.homegoodlilst, ...res.list];
                    this.loading=false;
                }
                if(this.homegoodlilst.length >= res.total){
                // 当finished=true时，触底加载暂时关闭了
                    this.finished = true
                }
            })
        },
        skipToLogin(){
            console.log('跳转至登入页')
        },
        onRefresh(){//下拉刷新时触发
            this.page=1;
            this.getlist()
        },
        onLoad() {//列表触底时触发
            this.page++;
            this.getlist()
            
        }

    },
    mounted(){
        this.getlist();
        console.log(222222222)
        
    }
}
</script>

<style lang='scss' scoped>
  .home {
      .top{
          position: fixed;
          width:100%;
          display: flex;
          flex-direction: column;
          top:0px;
          z-index: 2;
 
      }
      .top-search{
          width:100%;
          display: flex;
          background:rgb(200,37,25);
          justify-content: space-between;
          align-items: center;
      }
      .background{
        background-image: linear-gradient(0deg,#f1503b,#c82519 50%);
        position: absolute;
        height: 4.25rem;
        width: 100%;
        border-bottom-left-radius: 40%;
        border-bottom-right-radius: 40%;
        z-index:0;    
      }
      .van-search__content .van-search__content--round{
          width: 8rem;
      }
      .van-search__content--round{
          width: 7rem;
      }
      .search-icon{
        width: 20px;
        height: 18px;
        display: block;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgAgMAAAAdw9KTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUdwTP///////////waf0AoAAAADdFJOUwDjSYAlncUAAAAbSURBVBjTY5j/Hwq+MdTDmH+RmUgK6AuGhcsAU5tyB6Ji+x0AAAAASUVORK5CYII=) no-repeat center;
        background-size: 100% 100%;
        margin-left: 0.4rem;
        }
      
      .search-btn{
          color:white;
      }
      .van-swipe{
           width:9.5rem;
            height: 6rem;
            margin: 1.4rem auto;
            border-radius: .35rem;
            img{
            display: inline-block;
            width: 100%;
            height: 100%;
            }
        }
        .pic{
            display: flex;
            img{
                width:33%
            }
        }
        .good-list-title{
            margin-top:0.13rem;
            img{
                display:block;
                width:100%;
                height:0.93rem;
            }
        }
        .good-list-row{
            width:100%;
            display:flex;
        }
        
  }

</style>