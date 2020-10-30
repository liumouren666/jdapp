<template>
  <div class="cart">
      <!-- 自定义顶部navbar -->
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
      <!-- 购物车列表 -->
      <div class="row" v-for='item in list' :key='item._id'>
            <van-swipe-cell>
              <!-- 一行，type='flex' align='center' 实现上下居中 -->
              <van-row type='flex' align='center'>
                <!-- 第一列，放checkbox -->
                <van-col span="4">
                  <van-checkbox v-model="item.checked"></van-checkbox>
                  <!-- <input type="checkbox" :value="item._id" v-model="checkedlist" class="bos"> -->
                </van-col>
                <!-- 第二列，放card -->
                <van-col span="20">
                  <van-card
                    :num="item.num"
                    :price="item.good.price"
                    :desc="item.good.desc"
                    :title="item.good.name"
                    :thumb="item.good.img"
                  >
                    <template #footer>
                      <van-button size="mini" @click='changeNum(item,"sub")'>-</van-button>
                      <van-button size="mini" @click='changeNum(item)'>+</van-button>
                    </template>
                  </van-card>
                </van-col>
              </van-row>

              <!-- 这是swipe-cell的插槽 -->
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="delGoods(item)" />
              </template>
            </van-swipe-cell>
      </div>
      <!-- 底部提交按钮 -->
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="full">全选</van-checkbox>
        <!-- <input type="checkbox" v-model="full">全选 -->
      </van-submit-bar>
  </div>
</template>

<script>
import {
  Card,
  Tag,
  Button,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Col,
  Row,
  Toast,
  NavBar,
  Dialog
} from 'vant'
import {mapMutations} from 'vuex'
import img from '@/utils/img'
export default {
    // beforeRouteEnter(to, from, next) {//局部守卫
    //     let token=localStorage.getItem('token')
    //   if(token) {
    //     next()
    //   }else {
    //     next('/login')
    //   }
    // },
    name:'Cart',
    components:{
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [SwipeCell.name]: SwipeCell,
    [Col.name]: Col,
    [Row.name]: Row,
    [NavBar.name]: NavBar
    },
    data:function(){
        return {
          list:[],
          img,
          // checkedlist:[],
        }
    },
    computed:{
      full:{
        get(){
          let arr=this.list.filter(ele=>ele.checked)
          return arr.length===this.list.length
        },
        set(v){
          this.list.map((ele,idx,arr)=>{
            arr[idx].checked=v
          })
        }
                      //  get(){
                      //       return this.checkedlist.length==this.list.length;  
                      //  },
                      //  set(value){
                      //       console.log(value)
                      //       if(value){
                      //           this.checkedlist=this.list.map(ele=>{
                      //               return ele._id;
                      //           })
                      //       }else{
                      //           this.checkedlist=[];
                      //       }
                      //  }




      },
      //计算总价
      total(){
        let t=0
        this.list.map(ele=>{
          if(ele.checked){
            t+=ele.num*ele.good.price*100
          }
        })
        return t
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      ...mapMutations('tabbarChange',['updataNums']),
      //初始化页面
      init(){
      this.$api.getGoodLists({size:3}).then(res=>{
          console.log('2222',res)
          this.list=res
        })
      },
      //修改商品的数量
      changeNum(item,flag){
          let data ={
            id:item._id,
            num:flag ? item.num-1 :item.num+1
          }
          
          if(data.num<=0) return Toast("商品数量不能小于1");
          this.$api.changeCartNum(data).then(()=>{
            console.log("数据修改成功");

            this.list.map((ele,idx,arr)=>{
              if(ele._id === item._id) {
                arr[idx].num = data.num
              }
            })
          })
          console.log(this.list)
      },
      //删除商品
      delGoods(item){
        Dialog.confirm({
          title: '警告',
          message: '你确定要删除当前商品吗？',
        }).then(()=>{
          this.$api.getGoodLists({}).then(res=>{
              this.updataNums(res)
          })
          this.$api.delGoods({id:item._id}).then(()=>{
            this.list=this.list.filter(ele=>ele._id!==item._id)
          })
        })
      },

      onClickLeft(){
        this.$router.back()
      },
      onSubmit(){//提交商品
        let goods=''//购物车列表项id拼接成的字符串 ;1;2;3
        this.list.map(ele=>{
          if(ele.checked){
            goods+=(';'+ele._id)
          }
        })
        console.log(goods)
        this.$api.submitGoods({goods}).then(()=>{
          this.$api.getGoodLists({}).then(res=>{
              this.updataNums(res)
          })
          Toast('下单成功')
          this.init()
        })
      }
    }

}
</script>

<style lang='scss' scoped>
.cart {
  height:100%;
  background-color: white;
  padding-bottom: 1.47rem;
  padding-top: 1.25rem;
  .row {
    // margin-top: .13rem;
    border-top: 1px solid #eee;
  }
  .van-card {
    background-color: white;
    border-bottom: .03rem solid white;
    padding-left: 0;
  }
  .delete-button {
    height: 100%;
  }
  .van-button {
    padding: 0 .2rem;
  }
  .van-checkbox{
    display: flex;
    justify-content: center;
  }
}


</style>