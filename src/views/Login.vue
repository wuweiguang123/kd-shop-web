<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="../assets/logo1.png" alt="科大商铺">
      </div>

      <div class="login-form">
        <el-form
          ref="loginForm"
          :model="userForm"
          :rules="rules"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="userForm.userName"
              prefix-icon="el-icon-user"
              placeholder="请输入手机号/邮箱"
            />
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom:0;">
            <el-input
              v-model="userForm.password"
              type="password"
              prefix-icon="el-icon-key"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item class="form-links">
            <a href="#">忘记密码？</a>&nbsp;&nbsp;&nbsp;
            <a href="#">还没有账号？立即注册</a>
          </el-form-item>
          <el-form-item class="form-btns">
            <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
            <el-button type="info" @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 12,
            message: '用户名长度在 5 到 12 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    doLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post('user/login', this.userForm)
            .then((response) => {
              // console.log(response)
              // 当用户名密码错误时
              if (response.data.code === '-1') {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
                this.userForm.userName = ''
                this.userForm.password = ''
                return false;
              }
              this.$message({
                message: response.data.message,
                type: 'success'
              })
              // token只在网站打开期间生效，所以将token保存在sessionStorage中
              window.sessionStorage.setItem('token', response.data.token);
              // 通过编程式路由导航跳转到后台主页，路由地址是home
              this.$router.push('/home')
            })
            .catch((error) => {
              console.log(error)
            });
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-header {
  position: absolute;
  top: -16%;
  left: 35%;
}
.login-header img {
  // border: 1px solid rgba(221, 218, 215, 0.23);
  // border-radius: 50%;
  width: 120px;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.form-links {
      margin: 0;
    /* display: inline; */
    /* height: 20px; */
    /* float: right; */
    /* position: absolute; */
    text-align: right;
}
.form-btns {
  text-align: right;
}
</style>
