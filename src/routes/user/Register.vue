<template>
  <div class="Register">
        <van-nav-bar
            title="登入页面"
            left-text="返回"
            right-text="登入"
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
                 <van-field
                    v-model="password2"
                    type="password"
                    name="password2"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ required: true, message: '请确认密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    注册
                    </van-button>
                </div>
                </van-form>

  </div>
</template>

<script>
import {
Form,
 Field, 
 Button,
 NavBar
} from 'vant'
export default {
    name:'Register',
    components:{
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [NavBar.name]:NavBar
    },
    data:function(){
        return {
            username:'',
            password:'',
            password2:''

        }
    },
    methods:{
        onSubmit(data){
            console.log(data)
            this.$api.fetchRegister(data).then(()=>{
                console.log(22222)
                this.$router.replace('/login')
            })
        },
        onClickLeft(){
            this.$router.push('/')
        },
        onClickRight(){
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>