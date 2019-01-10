<template>
  <div id="count-page">
    <div id="num-count">
      <div id="admin-num" class="num">
        <div class="num-title">
          管理员总数量
        </div>
        <div class="num-body">
          {{adminCount}}
        </div>
      </div>
      <div id="people-num" class="num">
        <div class="num-title">
          人口总数量
        </div>
        <div class="num-body">
          {{userCount}}
        </div>
      </div>
      <div id="domicile-num" class="num">
        <div class="num-title">
          户籍总数量
        </div>
        <div class="num-body">
          {{domicileCount}}
        </div>
      </div>
    </div>
    <div id="img-count">
      <div id="all-user-count" class="img-count">
        <div class="img-count-title">
          各区域总用户对比
        </div>
        <div id="all-user-count-body">

        </div>
      </div>
      <div id="upload-count" class="img-count">
        <div class="img-count-title">
          各区域近六月上传对比
        </div>
        <div id="upload-count-body">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Count',
  props: {
    host: {
      type: String
    },
    areas: {
      type: Array
    }
  },
  data () {
    return {
      adminCount: 'N/A',
      userCount: 'N/A',
      domicileCount: 'N/A'
    }
  },
  methods: {
  },
  mounted: function () {
    let self = this
    let now = new Date()
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth() + 1
    function dup (n) {
      let month = nowMonth - n
      let year = nowYear
      if (month <= 0) {
        month = month + 12
        year = year - 1
      }
      return `${year}-${month}`
    }
    let months = [dup(5), dup(4), dup(3), dup(2), dup(1), dup(0)]
    let allUserCountOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: []
      },
      series: [
        {
          name: '总人口数量',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      ]
    }
    let uploadCountOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: this.areas
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        },
        right: '3%'
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: months
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: []
    }
    this.$http.get(this.host + 'super/graph')
      .then((res) => {
        if (res.data.status === 0) {
          self.adminCount = res.data.data.uploadCount
          self.userCount = res.data.data.peopleCount
          self.domicileCount = res.data.data.domicileCount
          allUserCountOption.series[0].data = res.data.data.partitionList
          allUserCountOption.legend.data = self.areas
          uploadCountOption.series = res.data.data.historyUpList
          self.$echarts.init(document.getElementById('all-user-count-body')).setOption(allUserCountOption)
          for (let j of uploadCountOption.series) {
            j.type = 'line'
            j.stack = '总量'
            j.areaStyle = {}
          }
          console.log(uploadCountOption)
          this.$echarts.init(document.getElementById('upload-count-body')).setOption(uploadCountOption)
        } else if (res.data.status === 10) {
          self.$message.error('尚未登录，请登录后操作')
          self.$router.push('/login')
        } else if (res.data.status === 1) {
          self.$message.error(res.data.msg)
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
  #num-count{
    overflow: hidden;
    width: 850px;
    margin: auto;
  }
.num{
  text-align: center;
  float: left;
  font-size: 20px;
  border-radius: 5px;
  width: 220px;
  letter-spacing: 2px;
  margin: 20px 30px;
}
.num-title{
  border-bottom: 1px solid #fff;
  padding: 8px 0;
}
.num-body{
  padding: 8px 0;
}
  #admin-num{
    background: #3379b7;
    color: #fff;
  }
  #people-num{
    background: #ffb800;
    color: #fff;
  }
  #domicile-num{
    background: #1E9FFF;
    color: #fff;
  }
  #img-count{
    text-align: center;
    margin-top: 30px;
    border-top: 3px solid #1E9FFF;
    padding-top: 30px;
  }
  .img-count{
    display: inline-block;
    height: 500px;
    margin: 0 2%;
  }
  #all-user-count{
    width: 30%;
  }
  #upload-count{
    width: 60%;
  }
  #all-user-count-body{
    height: 460px;
    margin-top: 20px;
  }
  #upload-count-body{
    height: 460px;
    margin-top: 20px;
  }
  .img-count-title{
    font-size: 20px;
    font-weight: bold;
  }
</style>
