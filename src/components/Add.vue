<template>
  <div>
    <div id="form">
      <div id="domicile">
        <el-form :model="domicile" :rules="rules" label-width="150px" ref="domicile">
          <el-form-item label="户籍码:" prop="domicileCode">
            <el-input v-model="domicile.domicileCode"></el-input>
          </el-form-item>
          <el-form-item label="汽车数量:">
            <el-input-number size="medium" v-model="domicile.carCount" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="汽车类型:">
            <el-input v-model="domicile.carCategory"></el-input>
          </el-form-item>
          <el-form-item label="养殖情况:">
            <el-input v-model="domicile.animal"></el-input>
          </el-form-item>
          <el-form-item label="互联网接入:">
            <el-switch
              v-model="domicile.internet"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="其他:">
            <el-input type="textarea" v-model="domicile.others" :rows="1" :cols="60"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div :class="(item % 2 === 0) ? 'add-people add-people-even' : 'add-people add-people-odd'" v-for="item in peopleNum" :key="item">
        <el-form :model="peoples[item-1]" :rules="rules" label-width="130px" ref="peopleForm">
          <div class="basic">
                <el-form-item label="姓名:" prop="peopleName">
                  <el-input v-model="peoples[item-1].peopleName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="cardId">
                  <el-input v-model="peoples[item-1].cardId"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
              <el-radio v-model="peoples[item-1].sex" :label="1">男</el-radio>
              <el-radio v-model="peoples[item-1].sex" :label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="户口性质:" prop="residence">
              <el-select v-model="peoples[item-1].residence" filterable placeholder="请选择户口性质" prop="residence">
                <el-option
                  v-for="i in options.residence"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与户主关系:" prop="relation">
              <el-select v-model="peoples[item-1].relation" placeholder="请选择" prop="relation" filterable>
                <el-option
                  v-for="i in options.relation"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期:" prop="birthday">
              <el-date-picker
                v-model="peoples[item-1].birthday"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="民族:" prop="peopleNational">
              <el-select v-model="peoples[item-1].peopleNational" placeholder="请选择民族" prop="peopleNational" filterable>
                <el-option
                  v-for="i in options.peopleNational"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文化程度:" prop="culture">
              <el-select v-model="peoples[item-1].culture" placeholder="请选择文化程度" prop="culture" filterable>
                <el-option
                  v-for="i in options.culture"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌:" prop="political">
              <el-select v-model="peoples[item-1].political" placeholder="请选择文化程度" prop="political" filterable>
                <el-option
                  v-for="i in options.political"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织关系所在地:" prop="organization">
              <el-input v-model="peoples[item-1].organization"></el-input>
            </el-form-item>
            <el-form-item label="现居住地:" prop="nowSpace">
              <el-input v-model="peoples[item-1].nowSpace"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="phone">
              <el-input v-model="peoples[item-1].phone"></el-input>
            </el-form-item>
            <el-form-item label="工作单位:">
              <el-input v-model="peoples[item-1].peopleWork"></el-input>
            </el-form-item>
            <el-form-item label="户籍所在地:" prop="domicileLocation">
              <el-input v-model="peoples[item-1].domicileLocation"></el-input>
            </el-form-item>
            <el-form-item label="宗教信仰:">
              <el-input v-model="peoples[item-1].religion"></el-input>
            </el-form-item>
            <el-form-item label="是否低保:">
              <el-switch
                v-model="peoples[item - 1].isSecurity"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="低保类别:">
              <el-input v-model="peoples[item-1].securityCategory" :disabled="!peoples[item - 1].isSecurity"></el-input>
            </el-form-item>
          </div>
          <div class="economics">
            <el-form-item label="年收入:">
              <el-input-number size="medium" v-model="peoples[item-1].earning" :step="0.1"></el-input-number>万元
            </el-form-item>
            <el-form-item label="医保类型:">
              <el-input v-model="peoples[item-1].joinSecurityCategory"></el-input>
            </el-form-item>
            <el-form-item label="养老保险类型:">
              <el-input v-model="peoples[item-1].pensionCategory"></el-input>
            </el-form-item>
            <el-form-item label="是否就业：">
              <el-switch
                v-model="peoples[item-1].isJob"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="职业:">
              <el-input v-model="peoples[item-1].jobName"></el-input>
            </el-form-item>
            <el-form-item label="下岗或失业:">
              <el-input v-model="peoples[item-1].reason"></el-input>
            </el-form-item>
            <el-form-item label="再就业情况:">
              <el-input v-model="peoples[item-1].reJob"></el-input>
            </el-form-item>
            <el-form-item label="求职意向:">
              <el-input v-model="peoples[item-1].jobIntention"></el-input>
            </el-form-item>
          </div>
          <div class="house">
            <el-form-item label="房屋性质:">
              <el-input v-model="peoples[item-1].houseProper"></el-input>
            </el-form-item>
            <el-form-item label="房屋间数:">
              <el-input-number size="medium" v-model="peoples[item-1].houseCount"></el-input-number>
            </el-form-item>
            <el-form-item label="建筑面积:">
              <el-input-number size="medium" v-model="peoples[item-1].houseSize"></el-input-number>
            </el-form-item>
            <el-form-item label="产权所有人:">
              <el-input v-model="peoples[item-1].houseOwner"></el-input>
            </el-form-item>
            <el-form-item label="使用性质:">
              <el-input v-model="peoples[item-1].useProper"></el-input>
            </el-form-item>
            <el-form-item label="租房时间:">
              <el-input-number v-model="peoples[item-1].houseTime"></el-input-number>
            </el-form-item>
            <el-form-item label="保障性住房:">
              <el-switch
                v-model="peoples[item-1].isHouseProtect"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="保障性住房类别：">
              <el-input v-model="peoples[item-1].houseCategory" :disabled="!peoples[item-1].isHouseProtect"></el-input>
            </el-form-item>
            <el-form-item label="享有减免或房屋补贴:">
              <el-switch
                v-model="peoples[item-1].good"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </div>
          <div class="hygiene">
            <el-form-item label="是否流动人口:">
              <el-switch
                v-model="peoples[item-1].isFlowPeople"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="婚姻状况：">
              <el-input v-model="peoples[item-1].marriage"></el-input>
            </el-form-item>
            <el-form-item label="结婚时间：">
              <el-date-picker
                v-model="peoples[item-1].marryTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="生育证号：">
              <el-input v-model="peoples[item-1].birthCard"></el-input>
            </el-form-item>
            <el-form-item label="独生证领取时间：">
              <el-date-picker
                v-model="peoples[item-1].oneChildTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="独生子女证号：">
              <el-input v-model="peoples[item-1].oneChildCard"></el-input>
            </el-form-item>
            <el-form-item label="流出入地址：">
              <el-input v-model="peoples[item-1].address"></el-input>
            </el-form-item>
            <el-form-item label="流出入时间：">
              <el-date-picker
                v-model="peoples[item-1].healthTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="血型：">
              <el-select v-model="peoples[item-1].blood" placeholder="请选择血型" filterable allow-create>
                <el-option
                  v-for="i in options.blood"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病史：">
              <el-input v-model="peoples[item-1].healthHistory"></el-input>
            </el-form-item>
            <el-form-item label="家族史：">
              <el-input v-model="peoples[item-1].homeHistory"></el-input>
            </el-form-item>
            <el-form-item label="既往史：">
              <el-input v-model="peoples[item-1].oldHistory"></el-input>
            </el-form-item>
            <el-form-item label="药物过敏史：">
              <el-input v-model="peoples[item-1].medicine"></el-input>
            </el-form-item>
            <el-form-item label="有无接触辐射:">
              <el-switch
                v-model="peoples[item-1].isFuShe"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </div>
          <div class="crime">
            <el-form-item label="社区矫正:">
              <el-switch
                v-model="peoples[item-1].isCommunityRemedy"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="矫正时间：">
              <el-date-picker
                v-model="peoples[item-1].remedyTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :disabled="!peoples[item-1].isCommunityRemedy"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="刑释解教：">
              <el-switch
                v-model="peoples[item-1].isRelease"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="帮教时间：">
              <el-date-picker
                v-model="peoples[item-1].helpTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :disabled="!peoples[item-1].isRelease"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否转化：">
              <el-switch
                v-model="peoples[item-1].isTurn"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="转化时间：">
              <el-date-picker
                v-model="peoples[item-1].turnTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :disabled="!peoples[item-1].isTurn"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否练习法轮功：">
              <el-switch
                v-model="peoples[item-1].isFaLun"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="其他邪教种类">
              <el-input v-model="peoples[item-1].cultCategory"></el-input>
            </el-form-item>
            <el-form-item label="是否吸毒：">
              <el-switch
                v-model="peoples[item-1].isDrug"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否孤寡：">
              <el-switch
                v-model="peoples[item-1].isWidows"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </div>
          <div class="army">
            <el-form-item label="涉军类型">
              <el-input v-model="peoples[item-1].armyCategory"></el-input>
            </el-form-item>
            <el-form-item label="入伍时间：">
              <el-date-picker
                v-model="peoples[item-1].inTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="服役部队">
              <el-input v-model="peoples[item-1].forces"></el-input>
            </el-form-item>
            <el-form-item label="退伍时间：">
              <el-date-picker
                v-model="peoples[item-1].outTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="安置单位">
              <el-input v-model="peoples[item-1].place"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div id="add-foot">
        <el-button type="primary" round @click="submitAdd">确认添加</el-button>
        <el-button type="success" round @click="addSame">添加同户</el-button>
        <el-button type="warning" round :disabled="peopleNum === 1 ? true : false" @click="reduceSame">减少同户</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  props: {
    host: {
      type: String
    }
  },
  data () {
    let validateCardId = (rule, value, callback) => {
      let i = 0
      for (i; i < this.peopleNum; i++) {
        if (this.peoples[i].cardId === value) {
          break
        }
      }
      if (value === '') {
        return callback(new Error('身份证号不能为空'))
      } else {
        if (value.length !== 18) {
          return callback(new Error('请输入正确的身份证号'))
        } else {
          let year = value.slice(6, 10)
          let month = value.slice(10, 12)
          let day = value.slice(12, 14)
          let date = `${year}-${month}-${day}`
          this.peoples[i].birthday = date
          let sex = value.slice(16, 17)
          this.peoples[i].sex = sex % 2 === 0 ? 0 : 1
        }
      }
    }
    return {
      domicile: {
        // 户籍表
        animal: '', // 养殖情况
        carCount: 0,
        carCategory: '',
        others: '',
        internet: 1,
        domicileCode: '' // 户籍码,
      },
      peoples: [],
      people: {
        // 基本表
        nowSpace: '', // 现居住地
        phone: '', //
        peopleName: '',
        sex: 1,
        relation: '', // 户主关系
        birthday: '',
        peopleNational: '', // 民族
        culture: '', // 文化成都
        political: '', // 政治面貌
        organization: '', // 组织所在地
        cardId: '', // 身份证号
        peopleWork: '', // 工作单位
        domicileLocation: '', // 户籍所在地
        earning: 1, // 年收入
        isWidows: 0, // 孤寡
        religion: '', // 宗教
        residence: '', // 户口性质
        isSecurity: 0, // 是否低保
        securityCategory: '', // 低保类别
        // 参保表
        joinSecurityCategory: '', // 医保类型
        pensionCategory: '', // 养老保险类型
        // 就业
        isJob: 1,
        jobName: '',
        reason: '', // 下岗或失业
        reJob: '', // 再就业
        jobIntention: '', // 求职意向
        // 住房表
        houseProper: '', // 房屋性质
        houseCount: '',
        houseSize: '',
        houseOwner: '', // int
        useProper: '', // 使用性质
        houseTime: '', // 租房时间
        isHouseProtect: 0, // 是否保障性住房
        houseCategory: '', // 保障性住房类别
        good: 0, // 是否享有减免，0-否 1-是
        // 卫生计生
        isFlowPeople: 0, // 是否流动人口
        marriage: '', // 婚姻状况
        marryTime: null,
        birthCard: '', // 生育证号
        oneChildTime: null, // 独生子女证书领取时间
        oneChildCard: '', // 独生子女证号
        address: '', // 流出入地址
        healthTime: null, // 流出入时间
        blood: '', // 血型
        healthHistory: '', // 病史
        homeHistory: '', // 家族史
        oldHistory: '', // 既往史
        medicine: '', // 过敏史
        isFuShe: 0, // 有无接触辐射
        // 犯罪
        isCommunityRemedy: 0, // 社区矫正
        remedyTime: null, // 矫正时间
        isRelease: 0, // 刑释解教
        helpTime: null, // 帮教时间
        isFaLun: 0,
        isTurn: 0, // 是否转化
        turnTime: null,
        cultCategory: '', // 其他邪教
        isDrug: 0, // 是否吸毒
        // 涉军
        armyCategory: '', // 涉军情况
        inTime: null, // 入伍时间
        outTime: null, //
        forces: '', // 兵役部队T
        place: '' // 安置单位
      },
      peopleNum: 1,
      rules: {
        domicileCode: [
          {required: true, message: '请输入户籍码'}
        ],
        peopleName: [
          {required: true, message: '请输入姓名'}
        ],
        sex: [
          {required: true, message: '请选择性别'}
        ],
        residence: [
          {required: true, message: '请选择户口类别'}
        ],
        relation: [
          {required: true, message: '请选择与户主关系'}
        ],
        birthday: [
          {required: true, message: '请选择出生日期'}
        ],
        peopleNational: [
          {required: true, message: '请选择民族'}
        ],
        culture: [
          {required: true, message: '请选择文化程度'}
        ],
        political: [
          {required: true, message: '请选择政治面貌'}
        ],
        organization: [
          {required: true, message: '请输入组织关系所在地'}
        ],
        nowSpace: [
          {required: true, message: '请输入现居住地'}
        ],
        cardId: [
          {validator: validateCardId, trigger: 'blur'},
          {required: true, message: '身份证号不能为空'}
        ],
        domicileLocation: [{
          required: true, message: '户籍所在地不能为空'
        }]
      },
      options: {
        residence: [
          {value: '未落常住户口', label: '未落常住户口'},
          {value: '非农业家庭户', label: '非农业家庭户'},
          {value: '农业家庭户', label: '农业家庭户'},
          {value: '非农业集体户', label: '非农业集体户'},
          {value: '农业集体户', label: '农业集体户'},
          {value: '自理口粮户', label: '自理口粮户'},
          {value: '寄住户口', label: '寄住户口'},
          {value: '暂住户口', label: '暂住户口'},
          {value: '蓝印户口', label: '蓝印户口'},
          {value: '混合户', label: '混合户'},
          {value: '其他户口', label: '其他户口'}
        ],
        relation: [
          {value: '户主', label: '户主'},
          {value: '配偶', label: '配偶'},
          {value: '子女', label: '子女'},
          {value: '父母', label: '父母'},
          {value: '岳父母或公婆', label: '岳父母或公婆'},
          {value: '祖父母', label: '祖父母'},
          {value: '媳婿', label: '媳婿'},
          {value: '孙子女', label: '孙子女'},
          {value: '兄弟姐妹', label: '兄弟姐妹'},
          {value: '其他', label: '其他'}
        ],
        peopleNational: [
          {value: '汉族', label: '汉族'},
          {value: '蒙古族', label: '蒙古族'},
          {value: '回族', label: '回族'},
          {value: '藏族', label: '藏族'},
          {value: '维吾尔族', label: '维吾尔族'},
          {value: '苗族', label: '苗族'},
          {value: '彝族', label: '彝族'},
          {value: '壮族', label: '壮族'},
          {value: '布依族', label: '布依族'},
          {value: '朝鲜族', label: '朝鲜族'},
          {value: '满族', label: '满族'},
          {value: '侗族', label: '侗族'},
          {value: '瑶族', label: '瑶族'},
          {value: '白族', label: '白族'},
          {value: '土家族', label: '土家族'},
          {value: '哈尼族', label: '哈尼族'},
          {value: '哈萨克族', label: '哈萨克族'},
          {value: '傣族', label: '傣族'},
          {value: '黎族', label: '黎族'},
          {value: '傈僳族', label: '傈僳族'},
          {value: '佤族', label: '佤族'},
          {value: '畲族', label: '畲族'},
          {value: '高山族', label: '高山族'},
          {value: '拉祜族', label: '拉祜族'},
          {value: '水族', label: '水族'},
          {value: '东乡族', label: '东乡族'},
          {value: '纳西族', label: '纳西族'},
          {value: '景颇族', label: '景颇族'},
          {value: '柯尔克孜族', label: '柯尔克孜族'},
          {value: '土族', label: '土族'},
          {value: '达斡尔族', label: '达斡尔族'},
          {value: '仫佬族', label: '仫佬族'},
          {value: '羌族', label: '羌族'},
          {value: '布朗族', label: '布朗族'},
          {value: '撒拉族', label: '撒拉族'},
          {value: '毛难族', label: '毛难族'},
          {value: '仡佬族', label: '仡佬族'},
          {value: '锡伯族', label: '锡伯族'},
          {value: '阿昌族', label: '阿昌族'},
          {value: '普米族', label: '普米族'},
          {value: '塔吉克族', label: '塔吉克族'},
          {value: '怒族', label: '怒族'},
          {value: '乌孜别克族', label: '乌孜别克族'},
          {value: '俄罗斯族', label: '俄罗斯族'},
          {value: '鄂温克族', label: '鄂温克族'},
          {value: '崩龙族', label: '崩龙族'},
          {value: '保安族', label: '保安族'},
          {value: '裕固族', label: '裕固族'},
          {value: '京族', label: '京族'},
          {value: '塔塔尔族', label: '塔塔尔族'},
          {value: '独龙族', label: '独龙族'},
          {value: '鄂伦春族', label: '鄂伦春族'},
          {value: '赫哲族', label: '赫哲族'},
          {value: '门巴族', label: '门巴族'},
          {value: '珞巴族', label: '珞巴族'},
          {value: '基诺族', label: '基诺族'}
        ],
        culture: [
          {value: '博士', label: '博士'},
          {value: '硕士', label: '硕士'},
          {value: '本科', label: '本科'},
          {value: '大专', label: '大专'},
          {value: '中专', label: '中专'},
          {value: '高中', label: '高中'},
          {value: '初中', label: '初中'},
          {value: '小学', label: '小学'},
          {value: '其他', label: '其他'}
        ],
        political: [
          {value: '中国共产党党员', label: '中国共产党党员'},
          {value: '中国共产党预备党员', label: '中国共产党预备党员'},
          {value: '中国共产主义青年团团员', label: '中国共产主义青年团团员'},
          {value: '中国国民党革命委员会会员', label: '中国国民党革命委员会会员'},
          {value: '中国民主同盟盟员', label: '中国民主同盟盟员'},
          {value: '中国民主建国会会员', label: '中国民主建国会会员'},
          {value: '中国民主促进会会员', label: '中国民主促进会会员'},
          {value: '中国农工民主党党员', label: '中国农工民主党党员'},
          {value: '中国致公党党员', label: '中国致公党党员'},
          {value: '九三学社会员', label: '九三学社会员'},
          {value: '台湾民主自治同盟盟员', label: '台湾民主自治同盟盟员'},
          {value: '无党派民主人士', label: '无党派民主人士'},
          {value: '群众', label: '群众'}
        ],
        blood: [
          {value: 'A型', label: 'A型'},
          {value: 'B型', label: 'B型'},
          {value: 'O型', label: 'O型'},
          {value: 'AB型', label: 'AB型'},
          {value: 'AO型', label: 'AO型'},
          {value: '其他', label: '其他'}
        ]
      }
    }
  },
  methods: {
    addSame: function () {
      this.peopleNum++
      let newPeople = {}
      for (let i in this.people) {
        newPeople[i] = this.people[i]
      }
      this.peoples.push(newPeople)
    },
    reduceSame: function () {
      this.peopleNum--
      this.peoples.pop()
    },
    submitAdd: function () {
      let self = this
      if (this.validateDomicile()) {
        if (this.validatePeople()) {
          this.$http.post(this.host + 'addPeople', {domicile: self.domicile, peopleList: self.peoples})
            .then((res) => {
              if (res.data.status === 0) {
                self.$message.success('添加成功')
                self.$emit('toSearch')
              } else if (res.data.status === 10) {
                self.$message.error('尚未登录，请登陆后操作')
                self.$router.push('/login')
              } else if (res.data.status === 1) {
                self.$message.error(res.data.msg)
              }
            })
            .catch(() => {
              self.$router.push('/login')
            })
        } else {
          console.log(this.validatePeople())
        }
      } else {
        return false
      }
      // console.log(this.peoples[0] === this.peoples[1])
    },
    validatePeople: function () {
      for (let i = 0; i < this.peopleNum; i++) {
        this.$refs['peopleForm'][i].validate((validate) => {
          if (validate) {
          } else {
            this.$message.error(`第${i + 1}人信息填写有误，请检查`)
          }
        })
        let peoples = this.peoples[i]
        let $message = this.$message
        if (peoples.peopleName === '') {
          $message.error(`第${i + 1}人姓名填写错误`)
          return false
        }
        if (peoples.cardId === '') {
          $message.error(`请填写${peoples.peopleName}的身份证号`)
          return false
        }
        if (peoples.residence === '') {
          $message.error(`请选择${peoples.residence}的户口性质`)
          return false
        }
        if (peoples.relation === '') {
          $message.error(`请选择${peoples.peopleName}的与户主关系`)
          return false
        }
        if (peoples.peopleNational === '') {
          $message.error(`请选择${peoples.peopleNational}的民族`)
          return false
        }
        if (peoples.culture === '') {
          $message.error(`请选择${peoples.peopleName}的文化程度`)
          return false
        }
        if (peoples.political === '') {
          $message.error(`请选择${peoples.peopleName}的政治面貌`)
          return false
        }
        if (peoples.organization === '') {
          $message.error(`请输入${peoples.peopleName}的组织关系所在地`)
          return false
        }
        if (peoples.nowSpace === '') {
          $message.error(`请填写${peoples.peopleName}的现居住地`)
          return false
        }
        if (peoples.domicileLocation === '') {
          $message.error(`请输入${peoples.peopleName}的户籍所在地`)
          return false
        }
      }
      return true
    },
    validateDomicile: function () {
      let status = false
      this.$refs['domicile'].validate((valid) => {
        if (valid) {
          status = true
        } else {
          this.$message.error('户籍表单填写有误，请检查')
          return false
        }
      })
      return status
    }
  },
  mounted: function () {
    let newPeople = {}
    for (let i in this.people) {
      newPeople[i] = this.people[i]
    }
    this.peoples.push(newPeople)
  }
}
</script>

<style scoped>
#form{
  font-size: 15px;
}
  .el-form * {
    float: left;
    line-height: 40px;
    vertical-align: center;
    display: block;
  }
  #domicile{
    overflow: hidden;
    border-bottom: 1px solid #409EFF;
  }
  .add-people{
    width: 99%;
    margin-top: 10px;
    padding: 10px 5px;
    overflow: hidden;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .add-people-odd {
    border: 2px solid #409EFF;
  }
  .add-people-odd .house,
  .add-people-odd .basic,
  .add-people-odd .hygiene,
  .add-people-odd .crime,
  .add-people-odd .economics{
    border-bottom: 1px solid #409EFF;
  }
  .add-people-even {
    border: 2px solid #67C23A;
  }
.add-people-even .house,
.add-people-even .basic,
.add-people-even .hygiene,
.add-people-even .crime,
.add-people-even .economics{
  border-bottom: 1px solid #67C23A;
}
  .economics{
    margin-top: 10px;
  }
  .house{
    margin-top: 10px;
  }
  .hygiene {
    margin-top: 10px;
  }
  .crime{
    margin-top: 10px;
  }
  .army{
    margin-top: 10px;
  }
  #add-foot{
    margin-top: 10px;
  }
  #add-foot .el-button{
    margin: 5px 10px;
  }
</style>
