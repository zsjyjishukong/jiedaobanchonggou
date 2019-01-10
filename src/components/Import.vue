<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="url"
      :with-credentials="true"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
    </el-upload>
    <div id="download">
      <a href="static/people.xlsx" download="人口信息.xlsx"><el-button>下载人口模板文件</el-button></a>
      <a href="static/domicile.xlsx" download="户籍信息.xlsx"><el-button>下载户籍模板文件</el-button></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Import',
  props: {
    host: {
      type: String
    }
  },
  data () {
    return {
      fileName: ''
    }
  },
  methods: {
    uploadSuccess: function (res, file, fileList) {
      let self = this
      if (res.status === 0) {
        self.$message.success('上传成功')
      } else if (res.status === 1) {
        fileList.pop()
        self.$message.error(res.msg)
      } else if (res.status === 10) {
        self.$message.error('尚未登录，请登陆后操作')
        self.$router.push('/login')
      }
    },
    beforeUpload: function (file) {
      if (file.name.slice(file.name.indexOf('.') + 1) !== 'xls' && file.name.slice(file.name.indexOf('.') + 1) !== 'xlsx') {
        this.$message.error('文件格式错误')
        return false
      } else {
        if (file.name.indexOf('domicile') !== -1) {
          this.fileName = 0
        } else {
          this.fileName = 1
        }
      }
    }
  },
  computed: {
    url: function () {
      return this.host + (this.fileName === 0 ? 'exDomicile' : 'exPeople')
    }
  }
}
</script>

<style scoped>
#download{
  margin-top: 40px;
}
  #download a{
    margin: 0 10px;
  }
</style>
