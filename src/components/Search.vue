<template>
  <div id="search-page">
    <div id="search-bar">
      <div id="search-bar-select-area" >
        <div v-show="selectAreaShow">
          区域选择:
          <el-select
            v-model="area"
            multiple
            filterable
            default-first-option
            placeholder="请选择查询的地区" >
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="search-bar-user-in">
          <SearchMeaus v-for="item in num" :key="item" v-on:plus="plus" v-on:dup="dup" v-on:searchMeaus="searchMeaus"
                       ref="searchMeaus"></SearchMeaus>
        <el-button @click="search">搜索</el-button>
        <el-button @click="downloadRes" v-show="download">下载</el-button>
      </div>
    </div>
    <div id="search-res" v-show="paginationShow">
      <el-table
        :data="searchResult"
        border
        style="width: 100%"
        v-loading="searchResultLoading">
        <el-table-column
          fixed
          prop="peopleName"
          label="姓名"
          width="120">
        </el-table-column>
        <!--基本表-->
        <el-table-column
          prop="nowSpace"
          label="现居住地"
          width="120">
        </el-table-column>
        <el-table-column
          prop="domicileCode"
          label="户籍码"
          width="120">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showDomicileEdit(scope.row.domicileCode)">{{ scope.row.domicileCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="80">
          <template slot-scope="scope">
          {{ scope.row.sex === 0 ? '女' : '男' }}
          </template>
        </el-table-column>
        <el-table-column
        prop="relation"
        label="与户主关系"
        width="120">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="peopleNational"
          label="民族"
          width="120">
        </el-table-column>
        <el-table-column
          prop="culture"
          label="文化程度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="political"
          label="政治面貌"
          width="120">
        </el-table-column>
        <el-table-column
          prop="organization"
          label="组织关系所在地"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cardId"
          label="身份证号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="peopleWork"
          label="工作单位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="domicileLocation"
          label="户籍地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="earning"
          label="年收入"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.earning }}万
          </template>
        </el-table-column>
        <el-table-column
        prop="isWidows"
        label="是否孤寡"
        width="120">
          <template slot-scope="scope">
            {{ scope.row.isWidows === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
        prop="religion"
        label="宗教信仰"
        width="120">
        </el-table-column>
        <el-table-column
          prop="residence"
          label="户口性质"
          width="120">
        </el-table-column>
        <!--参保表-->
        <el-table-column
          prop="joinSecurityCategory"
          label="医保类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="pensionCategory"
          label="养老保险类型"
          width="120">
        </el-table-column>
        <!--就业-->
        <el-table-column
          prop="isJob"
          label="是否就职"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isJob === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="职业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="下岗/失业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="reJob"
          label="再就业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="jobIntention"
          label="求职意向"
          width="120">
        </el-table-column>
        <!--住房-->
        <el-table-column
          prop="houseProper"
          label="房屋性质"
          width="120">
        </el-table-column>
        <el-table-column
          prop="houseCount"
          label="房屋间数"
          width="120">
          <template slot-scope="scope">
            {{scope.row.houseCount}}间
          </template>
        </el-table-column>
        <el-table-column
          prop="houseSize"
          label="房屋大小"
          width="120">
          <template slot-scope="scope">
            {{scope.row.houseSize}}平方米
          </template>
        </el-table-column>
        <el-table-column
          prop="houseOwner"
          label="产权所有人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="useProper"
          label="使用性质"
          width="120">
        </el-table-column>
        <el-table-column
          prop="houseTime"
          label="租房时间"
          width="120">
          <template slot-scope="scope">
            {{scope.row.houseTime }}年
          </template>
        </el-table-column>
        <el-table-column
          prop="isHouseProtect"
          label="是否享有保障性住房"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isHouseProtect === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="houseCategory"
          label="保障性住房类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isGood"
          label="是否享有减免"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isGood === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <!--卫生计生-->
        <el-table-column
          prop="isFlowPeople"
          label="是否流动人口"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isFlowPeople === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="marriage"
          label="婚姻状况"
          width="120">
        </el-table-column>
        <el-table-column
          prop="marryTime"
          label="结婚日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="birthCard"
          label="生育证号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="oneChildTime"
          label="独生证书领取时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="oneChildCard"
          label="独生子女证号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="流出入地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="healthTime"
          label="流出入时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="blood"
          label="血型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="healthHistory"
          label="病史"
          width="120">
        </el-table-column>
        <el-table-column
          prop="homeHistory"
          label="家族史"
          width="120">
        </el-table-column>
        <el-table-column
          prop="oldHistory"
          label="既往史"
          width="120">
        </el-table-column>
        <el-table-column
          prop="medicine"
          label="过敏史"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isFuShe"
          label="是否接触辐射"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isFuShe === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <!--犯罪-->
        <el-table-column
          prop="isCommunityRemedy"
          label="是否社区矫正"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isCommunityRemedy === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remedyTime"
          label="矫正时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isRelease"
          label="是否刑释解教"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isRelease === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="helpTime"
          label="帮教时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isFaLun"
          label="法轮功"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isFaLun === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="isTurn"
          label="是否转化"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isTurn === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="turnTime"
          label="转化时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cultCategory"
          label="其他邪教"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isDrug"
          label="是否吸毒"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.isDrug === 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <!--涉军-->
        <el-table-column
          prop="armyCategory"
          label="涉军情况"
          width="120">
        </el-table-column>
        <el-table-column
          prop="inTime"
          label="入伍时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="outTime"
          label="退伍时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="forces"
          label="兵役部队"
          width="120">
        </el-table-column>
        <el-table-column
          prop="place"
          label="安置单位"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="exportToWord(scope.row)" type="text" size="small">导出</el-button>
            <el-button @click="editPeople(scope.row)" type="text" size="small">编辑</el-button>
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.deleteConfirmShowOrNot"
              :key="scope.$index"
              >
              <div v-loading="confirmDeleteLoading">
                <p>确定要删除<span style="color: #E6A23C;">{{scope.row.peopleName}}</span>吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" v-on:click="deletePeople(scope.row)">确定</el-button>
                </div>
              </div>
              <el-button type="text" size="small" style="color: #F56C6C;" @click="changeConfirmDelete(scope)" slot="reference">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pagination" v-show="paginationShow">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,50,100,150,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="totalEntry">
      </el-pagination>
      <el-dialog
        width="95%"
        title="编辑管理员信息"
        :visible.sync="editUserDetailShow"
        append-to-body>
        <div id="edit-user">
          <el-form ref="userDetail" :model="userDetail" label-width="150px" v-loading="editUserLoading" :rules="rules">
            <div class="basic">
              <el-form-item label="姓名:" prop="peopleName">
                <el-input v-model="userDetail.peopleName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" prop="cardId">
                <el-input v-model="userDetail.cardId"></el-input>
              </el-form-item>
              <el-form-item label="性别:" prop="sex">
                <el-radio v-model="userDetail.sex" :label="1">男</el-radio>
                <el-radio v-model="userDetail.sex" :label="0">女</el-radio>
              </el-form-item>
              <el-form-item label="户口性质:" prop="residence">
                <el-select v-model="userDetail.residence" filterable placeholder="请选择户口性质" prop="residence">
                  <el-option
                    v-for="i in options.residence"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="与户主关系:" prop="relation">
                <el-select v-model="userDetail.relation" placeholder="请选择" prop="relation" filterable>
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
                  v-model="userDetail.birthday"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="民族:" prop="peopleNational">
                <el-select v-model="userDetail.peopleNational" placeholder="请选择民族" prop="peopleNational" filterable>
                  <el-option
                    v-for="i in options.peopleNational"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文化程度:" prop="culture">
                <el-select v-model="userDetail.culture" placeholder="请选择文化程度" prop="culture" filterable>
                  <el-option
                    v-for="i in options.culture"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌:" prop="political">
                <el-select v-model="userDetail.political" placeholder="请选择文化程度" prop="political" filterable>
                  <el-option
                    v-for="i in options.political"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="组织关系所在地:" prop="organization">
                <el-input v-model="userDetail.organization"></el-input>
              </el-form-item>
              <el-form-item label="现居住地:" prop="nowSpace">
                <el-input v-model="userDetail.nowSpace"></el-input>
              </el-form-item>
              <el-form-item label="联系方式:" prop="phone">
                <el-input v-model="userDetail.phone"></el-input>
              </el-form-item>
              <el-form-item label="工作单位:">
                <el-input v-model="userDetail.peopleWork"></el-input>
              </el-form-item>
              <el-form-item label="户籍所在地:" prop="domicileLocation">
                <el-input v-model="userDetail.domicileLocation"></el-input>
              </el-form-item>
              <el-form-item label="宗教信仰:">
                <el-input v-model="userDetail.religion"></el-input>
              </el-form-item>
              <el-form-item label="是否低保:">
                <el-switch
                  v-model="userDetail.isSecurity"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </div>
            <div class="economics">
              <el-form-item label="年收入:">
                <el-input-number size="medium" v-model="userDetail.earning" :step="0.1"></el-input-number>万元
              </el-form-item>
              <el-form-item label="医保类型:">
                <el-input v-model="userDetail.joinSecurityCategory"></el-input>
              </el-form-item>
              <el-form-item label="养老保险类型:">
                <el-input v-model="userDetail.pensionCategory"></el-input>
              </el-form-item>
              <el-form-item label="是否就业：">
                <el-switch
                  v-model="userDetail.isJob"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="职业:">
                <el-input v-model="userDetail.jobName"></el-input>
              </el-form-item>
              <el-form-item label="下岗或失业:">
                <el-input v-model="userDetail.reason"></el-input>
              </el-form-item>
              <el-form-item label="再就业情况:">
                <el-input v-model="userDetail.reJob"></el-input>
              </el-form-item>
              <el-form-item label="求职意向:">
                <el-input v-model="userDetail.jobIntention"></el-input>
              </el-form-item>
            </div>
            <div class="house">
              <el-form-item label="房屋性质:">
                <el-input v-model="userDetail.houseProper"></el-input>
              </el-form-item>
              <el-form-item label="房屋间数:">
                <el-input-number size="medium" v-model="userDetail.houseCount"></el-input-number>
              </el-form-item>
              <el-form-item label="建筑面积:">
                <el-input-number size="medium" v-model="userDetail.houseSize"></el-input-number>
              </el-form-item>
              <el-form-item label="产权所有人:">
                <el-input v-model="userDetail.houseOwner"></el-input>
              </el-form-item>
              <el-form-item label="使用性质:">
                <el-input v-model="userDetail.useProper"></el-input>
              </el-form-item>
              <el-form-item label="租房时间:">
                <el-input-number v-model="userDetail.houseTime"></el-input-number>
              </el-form-item>
              <el-form-item label="保障性住房:">
                <el-switch
                  v-model="userDetail.isHouseProtect"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="保障性住房类别：">
                <el-input v-model="userDetail.houseCategory" :disabled="!userDetail.isHouseProtect"></el-input>
              </el-form-item>
              <el-form-item label="享有减免或房屋补贴:">
                <el-switch
                  v-model="userDetail.good"
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
                  v-model="userDetail.isFlowPeople"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="婚姻状况：">
                <el-input v-model="userDetail.marriage"></el-input>
              </el-form-item>
              <el-form-item label="结婚时间：">
                <el-date-picker
                  v-model="userDetail.marryTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="生育证号：">
                <el-input v-model="userDetail.birthCard"></el-input>
              </el-form-item>
              <el-form-item label="独生证领取时间：">
                <el-date-picker
                  v-model="userDetail.oneChildTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="独生子女证号：">
                <el-input v-model="userDetail.oneChildCard"></el-input>
              </el-form-item>
              <el-form-item label="流出入地址：">
                <el-input v-model="userDetail.address"></el-input>
              </el-form-item>
              <el-form-item label="流出入时间：">
                <el-date-picker
                  v-model="userDetail.healthTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="血型：">
                <el-select v-model="userDetail.blood" placeholder="请选择血型" filterable allow-create>
                  <el-option
                    v-for="i in options.blood"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病史：">
                <el-input v-model="userDetail.healthHistory"></el-input>
              </el-form-item>
              <el-form-item label="家族史：">
                <el-input v-model="userDetail.homeHistory"></el-input>
              </el-form-item>
              <el-form-item label="既往史：">
                <el-input v-model="userDetail.oldHistory"></el-input>
              </el-form-item>
              <el-form-item label="药物过敏史：">
                <el-input v-model="userDetail.medicine"></el-input>
              </el-form-item>
              <el-form-item label="有无接触辐射:">
                <el-switch
                  v-model="userDetail.isFuShe"
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
                  v-model="userDetail.isCommunityRemedy"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="矫正时间：">
                <el-date-picker
                  v-model="userDetail.remedyTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!userDetail.isCommunityRemedy"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="刑释解教：">
                <el-switch
                  v-model="userDetail.isRelease"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="帮教时间：">
                <el-date-picker
                  v-model="userDetail.remedyTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!userDetail.isRelease"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="是否转化：">
                <el-switch
                  v-model="userDetail.isTurn"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="转化时间：">
                <el-date-picker
                  v-model="userDetail.turnTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!userDetail.isTurn"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="是否练习法轮功：">
                <el-switch
                  v-model="userDetail.isFaLun"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="其他邪教种类">
                <el-input v-model="userDetail.cultCategory"></el-input>
              </el-form-item>
              <el-form-item label="是否吸毒：">
                <el-switch
                  v-model="userDetail.isDrug"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否孤寡：">
                <el-switch
                  v-model="userDetail.isWidows"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </div>
            <div class="army">
              <el-form-item label="涉军类型">
                <el-input v-model="userDetail.armyCategory"></el-input>
              </el-form-item>
              <el-form-item label="入伍时间：">
                <el-date-picker
                  v-model="userDetail.inTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="服役部队">
                <el-input v-model="userDetail.forces"></el-input>
              </el-form-item>
              <el-form-item label="退伍时间：">
                <el-date-picker
                  v-model="userDetail.outTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="安置单位">
                <el-input v-model="userDetail.place"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div style="text-align: center">
            <el-button type="success" @click="updatePeople">确定</el-button>
            <el-button @click="editUserDetailShow = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <!--编辑户籍信息-->
      <el-dialog
        width="50%"
        title="编辑户籍信息"
        :visible.sync="domicileDetailShow"
        append-to-body>
        <el-form :model="domicileDetail" :rules="rules" label-width="150px" ref="domicileDetail">
          <el-form-item label="户籍码:" prop="domicileCode">
            <el-input v-model="domicileDetail.domicileCode"></el-input>
          </el-form-item>
          <el-form-item label="汽车数量:">
            <el-input-number size="medium" v-model="domicileDetail.carCount" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="汽车类型:">
            <el-input v-model="domicileDetail.carCategory"></el-input>
          </el-form-item>
          <el-form-item label="养殖情况:">
            <el-input v-model="domicileDetail.animal"></el-input>
          </el-form-item>
          <el-form-item label="互联网接入:">
            <el-switch
              v-model="domicileDetail.internet"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="其他:">
            <el-input type="textarea" v-model="domicileDetail.others" :rows="1" :cols="60"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="success" @click="updateDomicile">确定</el-button>
          <el-button type="danger" @click="deleteDomicile">删除</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import SearchMeaus from './SearchMeaus'
export default {
  name: 'Search',
  props: {
    host: {
      type: String
    }
  },
  components: {
    SearchMeaus
  },
  data () {
    let validateCardId = (rule, value, callback) => {
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
          this.userDetail.birthday = date
          let sex = value.slice(16, 17)
          this.userDetail.sex = sex % 2 === 0 ? 0 : 1
        }
      }
    }
    return {
      num: 1,
      datas: [],
      areas: [],
      area: [],
      searchResult: [],
      selectAreaShow: false,
      confirmDeleteLoading: false,
      searchResultLoading: false,
      editUserDetailShow: false,
      userDetail: {},
      domicileDetailShow: false,
      domicileDetail: {},
      editUserLoading: false,
      oldDomicileCode: '',
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
      },
      pageNo: 1,
      pageSize: 10,
      currentPage: 1,
      paginationShow: false,
      totalEntry: 0,
      download: false
    }
  },
  methods: {
    plus: function () {
      if (this.num > 4) {
        this.$message.warning('已达到添加上限')
      } else {
        this.num++
      }
    },
    dup: function () {
      if (this.num < 2) {
        this.$message.warning('已达到删除上限')
      } else {
        this.num--
      }
    },
    search: function () {
      let url = this.host + 'find?pageNo=' + this.pageNo + '&pageSize=' + this.pageSize
      this.paginationShow = true
      let self = this
      this.datas = []
      for (let i = 0; i < this.num; i++) {
        this.$refs.searchMeaus[i].send()
      }
      if (self.datas.length === 1) {
        let k = self.datas[0]
        if (k['field'] === 'people_name' && k['require'] === '=' && k['value'] === '') {
        } else if (k['field'] !== '' && k['require'] !== '' && k['value'] !== '') {
          if (k['field'] === 'sex') {
            k.value = (k.value === '男' ? 1 : 0)
          }
        } else {
          this.$message.warning('请补全查询条件')
          return false
        }
      } else {
        for (let i of self.datas) {
          if (i.field === '' || i.require === '' || i.value === '') {
            this.$message.warning('请补全查询条件')
            return false
          } else if (i.field === 'sex') {
            i.value = (i.value === '男' ? 1 : 0)
          }
        }
      }
      this.searchResultLoading = true
      this.$http.post(url, {areaList: self.area, conditionList: self.datas})
        .then(function (response) {
          if (response.data.status === 0) {
            self.searchResult = response.data.data.list
            for (let i of self.searchResult) {
              i.deleteConfirmShowOrNot = false
            }
            self.searchResultLoading = false
            self.totalEntry = response.data.data.total
            self.download = true
          } else if (response.data.status === 1) {
            self.$message.error(response.data.msg)
            self.searchResultLoading = false
          } else if (response.data.status === 10) {
            self.$message.error('未登录，请登陆后操作')
            self.searchResultLoading = false
            self.$router.push('/login')
          }
        })
        .catch(() => self.$message.warning('网络错误'))
    },
    searchMeaus: function (field, require, value) {
      this.datas.push({field: field, require: require, value: value})
    },
    deletePeople: function (obj) {
      this.confirmDeleteLoading = true
      let self = this
      this.$http.post(this.host + 'delPeople', self.$qs.stringify({peopleId: obj.peopleId}))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success(`删除用户${obj.peopleName}成功`)
            self.search()
            self.confirmDeleteLoading = false
          } else if (res.data.status === 10) {
            self.$message.error('未登录，请登陆后操作')
            self.$router.push('/login')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.confirmDeleteLoading = false
          self.$router.push('/login')
        })
    },
    changeConfirmDelete: function (obj) {
      obj.row.deleteConfirmShowOrNot = !obj.deleteConfirmShowOrNot
    },
    editPeople: function (obj) {
      this.editUserDetailShow = true
      this.userDetail = obj
    },
    updatePeople: function () {
      if (this.validatePeople() === true) {
        let self = this
        this.$http.post(self.host + 'upPeople', self.$qs.stringify(self.userDetail))
          .then((res) => {
            if (res.data.status === 0) {
              self.$message.success('更新成功')
              self.search()
              self.editUserDetailShow = false
            } else if (res.data.status === 1) {
              self.$message.error(res.data.msg)
            } else if (res.data.status === 10) {
              self.$message.error('尚未登录，请登录后操作')
            }
          })
          .catch(() => {
            self.$message.warning('网络错误')
            self.$router.push('/login')
          })
      }
    },
    validatePeople: function () {
      let self = this
      this.$refs['userDetail'].validate((validate) => {
        if (validate) {} else {
          self.$message.error('身份证格式有误')
        }
      })
      let $message = this.$message
      if (self.userDetail.peopleName === '') {
        $message.error(`姓名不能为空`)
        return false
      }
      if (self.userDetail.cardId === '') {
        $message.error(`请填写${self.userDetail.peopleName}的身份证号`)
        return false
      }
      if (self.userDetail.residence === '') {
        $message.error(`请选择${self.userDetail.residence}的户口性质`)
        return false
      }
      if (self.userDetail.relation === '') {
        $message.error(`请选择${self.userDetail.peopleName}的与户主关系`)
        return false
      }
      if (self.userDetail.peopleNational === '') {
        $message.error(`请选择${self.userDetail.peopleNational}的民族`)
        return false
      }
      if (self.userDetail.culture === '') {
        $message.error(`请选择${self.userDetail.peopleName}的文化程度`)
        return false
      }
      if (self.userDetail.political === '') {
        $message.error(`请选择${self.userDetail.peopleName}的政治面貌`)
        return false
      }
      if (self.userDetail.organization === '') {
        $message.error(`请输入${self.userDetail.peopleName}的组织关系所在地`)
        return false
      }
      if (self.userDetail.nowSpace === '') {
        $message.error(`请填写${self.userDetail.peopleName}的现居住地`)
        return false
      }
      if (self.userDetail.domicileLocation === '') {
        $message.error(`请输入${self.userDetail.peopleName}的户籍所在地`)
        return false
      }
      return true
    },
    pageSizeChange: function (val) {
      this.pageSize = val
      this.search()
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.pageNo = val
      this.search()
    },
    showDomicileEdit: function (val) {
      let self = this
      this.$http.post(this.host + 'getDomicile', self.$qs.stringify({domicileCode: val}))
        .then((res) => {
          if (res.data.status === 0) {
            self.domicileDetailShow = true
            self.domicileDetail = res.data.data
            console.log(res.data.data.internet)
            console.log(self.domicileDetail.internet)
            self.oldDomicileCode = res.data.data.domicileCode
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
            return false
          } else if (res.data.status === 10) {
            self.$message.error('未登录，请登录后操作')
            self.$router.push('/login')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    },
    updateDomicile: function () {
      let self = this
      self.domicileDetail.oldDomicileCode = self.oldDomicileCode
      this.$http.post(self.host + 'upDomicile', self.$qs.stringify(self.domicileDetail))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success('更新成功')
            self.search()
            self.domicileDetailShow = false
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登录后操作')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    },
    deleteDomicile: function () {
      let self = this
      this.$http.post(self.host + 'delDomicile', self.$qs.stringify({domicileId: self.domicileDetail.domicileId}))
        .then((res) => {
          if (res.data.status === 0) {
            self.$message.success('删除成功')
            self.search()
            self.domicileDetailShow = false
          } else if (res.data.status === 1) {
            self.$message.error(res.data.msg)
          } else if (res.data.status === 10) {
            self.$message.error('尚未登录，请登录后操作')
          }
        })
        .catch(() => {
          self.$message.warning('网络错误')
          self.$router.push('/login')
        })
    },
    exportToWord: function (obj) {
      window.open(this.host + 'down?peopleId=' + obj.peopleId)
    },
    downloadRes: function () {
      window.open(this.host + 'downResult')
    }
  },
  mounted: function () {
    let self = this
    this.$http.get(this.host + 'super/init')
      .then((response) => {
        if (response.data.status === 0) {
          this.areas = response.data.data
          this.selectAreaShow = true
        } else if (response.data.status === 10) {
          self.$message.error('尚未登陆，请登陆后操作')
          self.$router.push('/login')
        }
      })
      .catch(() => {
        self.$message.warning('网络错误')
        self.$router.push('/login')
      })
  }
}
</script>

<style scoped>
  #search-bar{
    border: 1px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  .el-button{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-select{
    width: 30%;
  }
  #search-bar-select-area{
    text-align: left;
    border-bottom: 1px solid #ccc;
    background: #409EFF;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    min-height: 40px;
    line-height: 60px;
    padding: 0 30px;
  }
  #search-bar-user-in{
  }
  #edit-user .el-form * {
    float: left;
    line-height: 40px;
    vertical-align: center;
    display: block;
  }
  #edit-user {
    overflow: hidden;
  }
  #edit-user .house,
  #edit-user .basic,
  #edit-user .hygiene,
  #edit-user .crime,
  #edit-user .economics{
    border-bottom: 1px solid #67C23A;
    margin-top: 10px;
  }
  #edit-user .army {
    margin-top: 10px;
  }
  .el-select{
    width: 207px;
  }
  .el-table-column template .el-button {
    min-width: 100px;
  }
  #pagination{
    margin-top: 20px;
  }
</style>
