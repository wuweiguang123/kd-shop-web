<template>
  <el-container>
    <!-- header start -->
    <el-header>
      <div class="logo">
        <img src="../assets/kdmall-logo.png">
      </div>
      <div class="nav-right">
        <el-link>注册</el-link>
        <el-link class="login-btn">登录</el-link>
      </div>
    </el-header>
    <!-- header end -->
    <!-- main start -->
    <el-main>
      <div class="main-search">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="书籍" value="1" />
            <el-option label="数码" value="2" />
            <el-option label="日用品" value="3" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
      <div class="banner">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in banners" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-main>
    <!-- main end -->
    <!-- footer -->
    <el-footer>
      <div class="footer-bottom-wrap">
        <div class="footer-bottom">
          <p class="tips">本站所有信息均为用户自由发布，本站不对信息的真实性负任何责任，交易时请注意识别信息的真假如有网站内容侵害了您的权益请联系我们删除</p>
          <p class="right">
            <span>Copyright © 2017-2018, kd-shop, All Rights Reserved</span>
          </p>
        </div>
      </div>
    </el-footer>
    <el-backtop target=".logo" />
  </el-container>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      banners: ['https://kd-shop.oss-cn-beijing.aliyuncs.com/banner1.png',
                'https://kd-shop.oss-cn-beijing.aliyuncs.com/banner2.png',
                'https://kd-shop.oss-cn-beijing.aliyuncs.com/banner3.png'],
      input3: '',
      select: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header .logo {
    float: left;
    margin-left: 100px;
    height: 60px;
  }
  .el-header .logo img {
    margin-top: 4px;
  }
  .el-header .nav-right {
    float: right;
    margin-right: 100px;
    .login-btn {
      margin-left: 20px;
    }
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .main-search {
    width: 550px;
    height: 60px;
    margin: 0 auto;

    .el-select {
      width: 120px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
  .banner {
    width: 500px;
    // border: 1px solid red;
    img {
      width: 500px;
    }
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .footer-bottom-wrap {
    background-color: #fff;
    height: 180px;
    min-width: 1100px;
    .footer-bottom {
      width: 1100px;
      margin: 0 auto;
      padding-top: 20px;
      p {
        margin-top: 15px;
        font-size: 13px;
        color: #A9AAAA;
      }
    }
  }
</style>
