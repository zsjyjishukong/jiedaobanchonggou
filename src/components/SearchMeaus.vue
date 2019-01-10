<template>
  <div id="a-search">
    <el-select v-model="item" placeholder="限定词汇">
      <el-option label="户籍码" value="domicile_code"></el-option>
      <el-option label="现居住地" value="now_space"></el-option>
      <el-option label="联系方式" value="phone"></el-option>
      <el-option label="身份证号" value="card_id"></el-option>
      <el-option label="姓名" value="people_name"></el-option>
      <el-option label="性别" value="sex"></el-option>
      <el-option label="与户主关系" value="relation"></el-option>
      <el-option label="出生日期" value="birthday"></el-option>
      <el-option label="民族" value="people_national"></el-option>
      <el-option label="文化程度" value="culture"></el-option>
      <el-option label="政治面貌" value="political"></el-option>
      <el-option label="组织关系所在地" value="organization"></el-option>
      <el-option label="工作单位" value="people_work"></el-option>
      <el-option label="户籍地址" value="domicile_location"></el-option>
      <el-option label="年收入" value="earning"></el-option>
      <el-option label="宗教信仰" value="religion"></el-option>
      <el-option label="血型" value="blood"></el-option>
      <el-option label="生育证号" value="birth_card"></el-option>
      <el-option label="病史" value="health_history"></el-option>
      <el-option label="家族史" value="home_history"></el-option>
      <el-option label="既往史" value="old_history"></el-option>
      <el-option label="过敏史" value="medicine"></el-option>
      <el-option label="邪教种类" value="cult_category"></el-option>
    </el-select>
    <el-select v-model="relation" placeholder="限定关系">
      <el-option label="是" value="="></el-option>
      <el-option label="不是" value="!="></el-option>
      <el-option label="含有" value="LIKE"></el-option>
      <el-option label="不含有" value="NOT LIKE"></el-option>
      <el-option label="大于" value=">"></el-option>
      <el-option label="小于" value="<"></el-option>
      <el-option label="大于等于" value=">="></el-option>
      <el-option label="小于等于" value="<="></el-option>
    </el-select>
    <el-input placeholder="请输入内容" v-model="detail" class="input-with-select">
      <el-button slot="append" icon="el-icon-plus" style="border-right: 1px solid #ccc; -webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;" @click="plus"></el-button>
      <el-button slot="append" icon="el-icon-minus" @click="dup"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchMeaus',
  data () {
    return {
      item: '',
      relation: '',
      detail: ''
    }
  },
  methods: {
    plus: function () {
      this.$emit('plus')
    },
    dup: function () {
      this.$emit('dup')
    },
    send: function () {
      this.$emit('searchMeaus', this.item, this.relation, this.detail)
    }
  }
}
</script>

<style scoped>
  .el-select {
    width: 115px;
    margin: 0 10px;
    line-height: 20px;
  }
  .el-input{
    width: 50%;
  }
  .input-with-select {
    background-color: #fff;
  }
  .el-input-group__prepend {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  #a-search{
    margin: 10px 0;
  }
</style>
