<template>
  <div id="login-page" @keyup.13="loginNow">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
        <div id="el-main" ref="elmain" >
          <div id="login-img-big">
            <img src="../../assets/photo.png" height="300px" :style="{marginLeft: imgMarginLeft+'px'}">
          </div>
          <div id="login-all" :style="{marginLeft: allMarginLeft+'px'}">
            <div id="login-head">
              管理员登陆
            </div>
            <div id="login-body" v-loading="loading">
              <el-input placeholder="请输入用户名" v-model="uname">
                <template slot="prepend">用户名</template>
              </el-input>
              <el-input placeholder="请输入密码" v-model="pass" type="password">
                <template slot="prepend">&nbsp;密&nbsp;码&nbsp;</template>
              </el-input>
            </div>
            <div id="login-foot">
              <el-button @click="loginNow">登陆</el-button>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        版权所有&技术支持：张家口市宏鑫网络科技有限公司
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'

export default {
  name: 'Login',
  components: {Header},
  data () {
    return {
      uname: '',
      pass: '',
      imgMarginLeft: 1,
      allMarginLeft: 1,
      host: 'http://' + window.location.hostname + ':8081/back/',
      // host: 'http://192.168.49.147:8080/back/',
      loading: false
    }
  },
  methods: {
    loginNow: function () {
      let uname = this.uname
      let pwd = this.pass
      if (uname === '') {
        this.$message.error('请输入用户名')
        return false
      } else if (pwd === '') {
        this.$message.error('请输入密码')
        return false
      }
      let self = this
      this.loading = !this.loading
      let url = this.host + 'login'
      this.$http.post(url, self.$qs.stringify({username: uname, password: pwd}))
        .then(function (response) {
          if (response.data.status === 0) {
            self.$message.success('登陆成功')
            setTimeout(() => self.$router.push('/'), 500)
          } else if (response.data.status === 1) {
            self.$message.error(response.data.msg)
            self.loading = false
          }
        })
        .catch(function () {
          self.$message.error('网络错误')
        })
    }
  },
  computed: {
  },
  mounted () {
    let elMainOffsetWidth = this.$refs.elmain.offsetWidth
    this.imgMarginLeft = elMainOffsetWidth / 4 - 150
    this.allMarginLeft = elMainOffsetWidth / 2 - 593
  }
}
</script>

<style scoped>
  .el-header {
    background: linear-gradient(#abeeff, #ffffff);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 15px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 550px;
    border-top: 20px solid #00589c;
    border-bottom: 20px solid #00589c;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #login-img-big{
    float: left;
    margin-top: 60px;
  }
  #login-all{
    float: left;
    width: 400px;
    height: 300px;
    background: rgb(255,255,255);
    line-height: 50px;
    padding: 0 20px ;
    margin-top: 60px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  #login-head{
    padding: 5px 1px;
    border-bottom: 3px solid #409EFF;
    color: #555;
    font-size: 25px;
    letter-spacing: 5px;
  }
  #login-body{
    padding: 10px 5px;
    border-bottom: 3px solid #409EFF;
  }
  #login-body .el-input{
    margin: 15px 0;
  }
  #login-foot{
    margin-top: 10px;
  }
  .el-button{
    border: 1px solid #409Eff;
    color: #409EFF;
    width: 40%;
    text-align: center;
  }
</style>
