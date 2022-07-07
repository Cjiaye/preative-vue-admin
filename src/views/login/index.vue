<template>
  <div class="login">
    <h2>vue-admin后台管理系统</h2>
    <el-form :model="loginForm" ref="LoginForm" :rules="loginFormRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="loginForm.password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model.trim="loginForm.code" />
        <img :src="codeImg" class="tu" @click="loadCaptcha" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import UserApi from '../../api/user'
import { useStore } from 'vuex'
const store = useStore()
const LoginForm = ref('')
const loginForm = reactive({
  username: 'test',
  password: '',
  code: '',
  token: ''
})
const codeImg = ref('')
const loginFormRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
}

const handleSubmit = () => {
  LoginForm.value.validate(async (valid) => {
    if (!valid) return
    await store.dispatch('user/login', loginForm)
  })
}

const loadCaptcha = async () => {
  const response = await UserApi.getCaptcha()
  codeImg.value = response.captchaImg
  loginForm.token = response.token
}
loadCaptcha()
</script>

<style scoped lang="scss">
.login {
  width: 350px;
  height: 300px;
  .tu {
    position: relative;
    top: -30px;
    left: 200px;
    height: 30px;
  }
}
</style>
