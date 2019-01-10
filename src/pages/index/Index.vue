<template>
  <div id="index-page">
    <el-container>
      <el-header>
        <img src="../../assets/logoIndex.png" height="50px">
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="100">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="showSelect">
                  <i class="el-icon-search"></i>
                  <span slot="title">高级检索</span>
                </el-menu-item>
                <el-menu-item index="2" @click="showImage" :disabled="imgCountDisabled">
                  <i class="el-icon-menu"></i>
                  <span slot="title" >图形统计</span>
                </el-menu-item>
                <el-menu-item index="3" @click="showImport" v-show="imgCountDisabled">
                  <i class="el-icon-document"></i>
                  <span slot="title">批量导入</span>
                </el-menu-item>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>批量导出</span>
                  </template>
                  <el-menu-item index="1-1" @click="exportDomicile">导出户籍</el-menu-item>
                  <el-menu-item index="1-2" @click="exportPeople">导出人口</el-menu-item>
                </el-submenu>
                <el-menu-item index="5" @click="showAdd" v-show="imgCountDisabled">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">人口添加</span>
                </el-menu-item>
                <el-menu-item index="6" @click="showAdminEdit" :disabled="adminEditDisabled">
                  <i class="el-icon-setting"></i>
                  <span slot="title">区域管理</span>
                </el-menu-item>
                <el-menu-item index="7" @click="logout">
                  <i class="el-icon-back"></i>
                  <span slot="title">退出登录</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <Search v-if="selectShow" v-bind:host="host"></Search>
            <Count v-if="imageShow" v-bind:host="host" v-bind:areas="areas"></Count>
            <Import v-if="importShow" v-bind:host="host"></Import>
            <Add v-if="addShow" v-bind:host="host" v-bind:toSearch="showSelect"></Add>
            <AdminEdit v-if="adminEditShow" v-bind:host="host"></AdminEdit>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>版权所有 & 技术支持：张家口市宏鑫网络科技有限公司</el-footer>
    </el-container>
  </div>
</template>

<script>
import Search from '../../components/Search'
import Count from '../../components/Count'
import Import from '../../components/Import'
import Add from '../../components/Add'
import AdminEdit from '../../components/AdminEdit'
export default {
  name: 'Index',
  components: {
    Search,
    Count,
    Import,
    Add,
    AdminEdit
  },
  data () {
    return {
      selectShow: true,
      imageShow: false,
      importShow: false,
      exportShow: false,
      addShow: false,
      adminEditShow: false,
      host: 'http://175.6.73.209:8081/back/',
      // host: 'http://192.168.49.147:8080/back/',
      areas: [],
      imgCountDisabled: true,
      adminEditDisabled: true
    }
  },
  methods: {
    showSelect: function () {
      this.selectShow = true
      this.imageShow = false
      this.importShow = false
      this.exportShow = false
      this.addShow = false
      this.adminEditShow = false
    },
    showImage: function () {
      this.selectShow = false
      this.imageShow = true
      this.importShow = false
      this.exportShow = false
      this.addShow = false
      this.adminEditShow = false
    },
    showImport: function () {
      this.selectShow = false
      this.imageShow = false
      this.importShow = true
      this.exportShow = false
      this.addShow = false
      this.adminEditShow = false
    },
    showAdd: function () {
      this.selectShow = false
      this.imageShow = false
      this.importShow = false
      this.exportShow = false
      this.addShow = true
      this.adminEditShow = false
    },
    showAdminEdit: function () {
      this.selectShow = false
      this.imageShow = false
      this.importShow = false
      this.exportShow = false
      this.addShow = false
      this.adminEditShow = true
    },
    logout: function () {
      this.$http.get(this.host + 'logout')
        .then((res) => {
          if (res.data.status === 0) {
            this.$message.success('已退出登录')
            setTimeout(() => {
              this.$router.push('/login')
            }, 500)
          }
        })
        .catch(() => this.$message.warning('网络错误'))
    },
    exportPeople: function () {
      window.open(this.host + 'exportP')
    },
    exportDomicile: function () {
      window.open(this.host + 'exportD')
    }
  },
  mounted: function () {
    let self = this
    this.$http.get(this.host + 'super/init')
      .then((response) => {
        if (response.data.status === 0) {
          self.imgCountDisabled = false
          self.adminEditDisabled = false
          for (let i of response.data.data) {
            this.areas.push(i.value)
          }
        } else if (response.data.status === 10) {
        }
      })
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-header img{
    margin-top: 5px;
  }
  .el-footer {
    /*background-color: #B3C0D1;*/
    background-color: #eee;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-menu{
    border-right: none;
  }
  .el-aside {
    background-color: #fff;
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    user-select: none;
    border-right: 1px solid #ccc;
  }
  .el-col{
    width: 100%;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    min-height: 83vh;
    color: #333;
    text-align: center;
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
  .el-submenu .el-menu-item{
    font-size: 12px;
    margin-left: 20px;
  }
</style>
