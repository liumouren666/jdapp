<template>
    <div class="AddressList">
          <!-- 导航 -->
        <van-nav-bar
            title="地址"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
          <!-- 地址管理 -->
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import {
  NavBar ,
  AddressList ,
  Toast

} from 'vant'
export default {
    name:'AddressList',
    components:{
        [NavBar.name]:NavBar,
        [AddressList.name]:AddressList
    },
    data:function(){
        return {
            chosenAddressId:'1',
            list:[
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ],
            disabledList:[
                {
                    id: '3',
                    name: '王五',
                    tel: '1320000000',
                    address: '浙江省杭州市滨江区江南大道 15 号',
                },
            ]
        }
    },
    computed:{
    },
    methods:{
        onClickLeft(){
            this.$router.push('/user')
        },
        onAdd(){
            Toast("新增地址")
            this.$router.push('/address')
        },
        onEdit(){

            Toast('编辑地址')

            this.$router.push('/address')
        }


    },
    mounted(){
        let adress=JSON.parse(localStorage.getItem('adress'))||null
        if(adress){
            console.log(adress)
            var obj={}
            for(var key in adress){//id: '2',    name: '李四', address: '浙江省杭州市拱墅区莫干山路 50 号', tel: '1310000000',
                    switch(key){
                        case 'id':obj.id=adress.id;
                           break;
                        case 'name':obj.name=adress.name;
                          break;
                        case 'tel' :obj.tel=adress.tel;
                          break;
                        case 'addressDetail':obj.address=adress.addressDetail
                          break;
                        case 'isDefault':obj.isDefault=adress.isDefault
                    }
            }  
            this.list.push(obj)
        }
    }
}
</script>

<style lang='scss' scoped>

</style>
