<template>
    <div class="Address">
        <!-- 导航 -->
        <van-nav-bar
            title="地址管理"
            left-text="返回"
            right-text='个人中心'
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <!-- 填写地址 -->
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import {
NavBar,
Toast,
AddressEdit,
} from 'vant'
export default {
    name:'Address',
    components:{
        [NavBar.name]:NavBar,
        [AddressEdit.name]:AddressEdit
    },
    data:function(){
        return {
            areaList:{
                province_list: {
                                        110000: '北京市',
                                        120000: '天津市'
                                    },
                                    city_list: {
                                        110100: '北京市',
                                        110200: '县',
                                        120100: '天津市',
                                        120200: '县'
                                    },
                                    county_list: {
                                        110101: '东城区',
                                        110102: '西城区',
                                        110105: '朝阳区',
                                        110106: '丰台区',
                                        120101: '和平区',
                                        120102: '河东区',
                                        120103: '河西区',
                                        120104: '南开区',
                                        120105: '河北区',
                                    }
            },
            searchResult:[],
        }
    },
    computed:{
    },
    mounted(){

    },
    methods:{
        onClickLeft(){
            
            this.$router.push('/addresslist');
        },
        onClickRight(){
            this.$router.push('/user')
        },
        onSave(count){
            Toast("Save")
            localStorage.setItem('adress',JSON.stringify(count));
            this.$router.push('/addresslist')
        },
        onDelete(){
            Toast('delete')
        },
        onChangeDetail(){

        }
    }
}
</script>

<style>

</style>