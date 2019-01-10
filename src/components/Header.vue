<template>
  <div id="head">
    <header>
      <img src="../assets/logo.png" height="40px"/>
      <span class="time">{{date}}</span> <span class="time">{{weekday}} </span>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header.vue',
  props: {
    host: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    date: function () {
      var now = new Date()
      var year = now.getFullYear().toString()
      var month = (now.getMonth() + 1).toString()
      var day = now.getDate().toString()
      var date = year + '年' + month + '月' + day + '日'
      return date
    },
    weekday: function () {
      let now = new Date()
      let weekday = now.getDay()
      switch (weekday) {
        case 0:
          weekday = '星期日'
          break
        case 1:
          weekday = '星期一'
          break
        case 2:
          weekday = '星期二'
          break
        case 3:
          weekday = '星期三'
          break
        case 4:
          weekday = '星期四'
          break
        case 5:
          weekday = '星期五'
          break
        case 6:
          weekday = '星期六'
          break
      }
      return weekday
    }
  }
}
</script>

<style scoped>
  header{
    line-height: 60px;
    text-align: right;
  }
  .time{
    font-size: 15px;
    padding: 5px;
  }
  img{
    height: 50px;
    float: left;
    margin-top: 5px;
  }
  #head{
    background: linear-gradient(#abeeff, #ffffff);
  }
</style>
