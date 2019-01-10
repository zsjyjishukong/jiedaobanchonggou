<template>
  <div id="admin-edit-page">
    <div>
      <el-table
      :data="admin"
      style="width: 100%;">
      <el-table-column
        prop="ID"
        label="ID"
        width="175">
      </el-table-column>
      <el-table-column
        prop="name"
        label="管理员名称"
        width="175">
      </el-table-column>
      <el-table-column
        prop="power"
        label="权限"
        width="175">
        <template slot-scope="scope">
          {{scope.row.power === 1 ? '超级管理员' : '普通管理员'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="175">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-popover
            placement="top"
            width="160"
            v-model="scope.row.confirmShowOrNot"
            :key="scope.ID">
            <div v-loading="confirmDeleteLoading">
              <p>确定要删除管理员<span style="color: #E6A23C;">{{scope.row.name}}</span>吗？<span style="color: #F56C6C">删除管理员会导致该管理员上传的所有用户丢失</span> </p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="deleteAdmin(scope.row)">确定</el-button>
              </div>
            </div>
            <el-button type="text" size="small" @click="confirmDelete(scope.row)" slot="reference">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
      <!-- 管理员详情-->
      <el-dialog
        width="30%"
        title="编辑管理员信息"
        :visible.sync="editAdminDetailShow"
        append-to-body>
        <el-form ref="adminDetail" :model="adminDetail" label-width="120px" v-loading="editAdminLoading" :rules="rules">
          <el-form-item label="管理员 ID : ">
            <el-form-item style="text-align: center">{{adminDetail.id}}</el-form-item>
          </el-form-item>
          <el-form-item label="管理员负责区域 : ">
            <el-input v-model="adminDetail.uploadArea"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码 : ">
            <el-input v-model="adminDetail.password" placeholder="不填写则不更改" type="password"></el-input>
          </el-form-item>
          <el-form-item label="管理员权限 : ">
            <el-select v-model="adminDetail.role" placeholder="请选择管理员权限">
              <el-option label="普通管理员" :value="0"></el-option>
              <el-option label="超级管理员" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <div style="text-align: center">
            <el-button type="success" @click="updateAdmin">确定</el-button>
            <el-button @click="editAdminDetailShow = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <div style="margin-top: 30px;">
      <el-button type="primary" @click="addAdminDialogShow = !addAdminDialogShow">添加管理员</el-button>
      <!--添加管理员-->
      <el-dialog
        width="30%"
        title="添加管理员"
        :visible.sync="addAdminDialogShow"
        append-to-body>
        <el-form ref="addAdminDetail" :model="addAdminDetail" label-width="120px" v-loading="addAdminLoading" :rules="rules">
          <el-form-item label="管理员名称 : " prop="uploadArea">
            <el-input v-model="addAdminDetail.uploadArea"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码 : " prop="password">
            <el-input v-model="addAdminDetail.password" placeholder="必须包含大写字母、小写字母以及数字" type="password"></el-input>
          </el-form-item>
          <el-form-item label="管理员权限 : " prop="role">
            <el-select v-model="addAdminDetail.role" placeholder="请选择管理员权限">
              <el-option label="普通管理员" value="0"></el-option>
              <el-option label="超级管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <div style="text-align: center">
            <el-button type="success" @click="addAdmin">确定</el-button>
            <el-button @click="addAdminDialogShow = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEdit',
  props: {
    host: {
      type: String
    }
  },
  data () {
    var validatePass = function (rules, value, callback) {
      let res = value
      if (res === null) {
        return callback(new Error('密码为8-16位，必须包含大写字母、小写字母以及数字'))
      }
    }
    return {
      admin: [],
      rules: {
        uploadArea: [
          {required: true, message: '管理员名称不能为空'}
        ],
        password: [
          {required: true, message: '密码不能为空'},
          {validator: validatePass, trigger: 'change'}
        ],
        role: [
          {required: true, message: '管理员权限不能为空'}
        ]
      },
      confirmDeleteLoading: false,
      editAdminDetailShow: false,
      adminDetail: '',
      editAdminLoading: false,
      addAdminDialogShow: false,
      addAdminDetail: {
        uploadArea: '',
        password: '',
        role: ''
      },
      addAdminLoading: ''
    }
  },
  methods: {
    edit: function (obj) {
      console.log(obj)
      this.editAdminDetailShow = true
      this.adminDetail = {
        id: obj.ID,
        uploadArea: obj.name,
        role: obj.power,
        password: '',
        uploadId: obj.uploadId
      }
    },
    confirmDelete: function (obj) {
      obj.confirmShowOrNot = true
    },
    deleteAdmin: function (obj) {
      let self = this
      this.confirmDeleteLoading = true
      this.$http.post(self.host + 'super/del', this.$qs.stringify({uploadId: obj.uploadId}))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success(`删除管理员${obj.name}成功`)
            self.confirmDeleteLoading = false
            self.search()
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登录后操作')
          } else if (res.data.status === 20) {
            self.$message.error('越权操作！你的行为正在违法！你的IP已被记录!')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    },
    updateAdmin: function () {
      let self = this
      if (this.adminDetail.password === '') {
      } else {
        let res = this.adminDetail.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/g)
        if (res === null) {
          this.$message.warning('密码须8-16位，包含大写字母，小写字母以及数字')
          return false
        }
      }
      this.$http.post(self.host + 'super/update', this.$qs.stringify(self.adminDetail))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success('更新成功')
            self.editAdminDetailShow = false
            self.editAdminLoading = false
            self.search()
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登录后操作')
          } else if (res.data.status === 20) {
            self.$message.error('越权操作！你的行为正在违法！你的IP已被记录!')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
      this.editAdminLoading = true
    },
    addAdmin: function () {
      let data = this.addAdminDetail
      let self = this
      this.$refs['addAdminDetail'].validate((valid) => {
        if (valid) {
        } else {
          this.$message.error('管理员信息有误，请检查')
          return false
        }
      })
      if (self.addAdminDetail.uploadArea === '') {
        self.$message.error('管理员区域不能为空')
        return false
      }
      if (self.addAdminDetail.password === '') {
        self.$message.error('密码不能为空')
        return false
      }
      if (self.addAdminDetail.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/g) === null) {
        self.$message.error('密码格式错误')
        return false
      }
      if (self.addAdminDetail.role === '') {
        self.$message.error('管理员权限不能为空')
        return false
      }
      self.$http.post(self.host + 'super/add', self.$qs.stringify(data))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success('添加成功')
            self.addAdminDialogShow = false
            self.addAdminDetail = {
              uploadArea: '',
              password: '',
              role: ''
            }
            self.search()
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
            return false
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登陆后操作')
            self.$router.push('login')
          } else if (res.data.status === 20) {
            self.$message.error('越权操作！你的行为正在违法！你的IP已被记录!')
            return false
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    },
    search: function () {
      let self = this
      this.$http.get(self.host + 'super/find')
        .then((res) => {
          if (res.data.status === 0) {
            self.admin = res.data.data
            let j = 1
            for (let i of self.admin) {
              i.confirmShowOrNot = false
              i.ID = j
              j++
            }
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登陆后操作')
            self.$router.push('/login')
          } else if (res.data.status === 20) {
            self.$message.error('越权操作！你的IP已被记录！')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>

<style scoped>
#admin-edit-page{
  width: 700px;
  margin: auto;
}
</style>
