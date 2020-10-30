<template>
  <div class="Login">
      <!-- 顶部导航 -->
          <van-nav-bar
            title="登入页面"
            left-text="返回"
            right-text="注册"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            />

      <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                  登入
                </van-button>
            </div>
            </van-form>

  </div>
</template>

<script>
import {
Form,
Button,
Field,
NavBar,

} from 'vant'
export default {
    name:'Login',
    components:{
        [Form.name]:Form,
        [Button.name]:Button,
        [Field.name]:Field,
        [NavBar.name]:NavBar
    },
    data:function(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        onSubmit(data){
            //console.log(data)指的是用户名和密码；
            this.$api.fetchLogin(data).then(res=>{
                console.log(res)
                localStorage.setItem('token',res.token)
                console.log("logon",res)
                localStorage.setItem("name",res.username)
                this.$router.replace('/')
            })
        },
        onClickLeft(){
            this.$router.push('/')
        },
        onClickRight(){
            this.$router.push('/register')
        }
    }
}
</script>

<style>

</style>