<template>
  <div>
    <h1>{{ currentUser }} Current Status</h1>
    <h3>Coins:<span class="coin">{{ coin }}</span> | Current Exp:{{ currentExp }} | Current Level:{{ currentLevel }} | Next Level Exp:{{ nextLevelExp }} | Need Exp:{{ needExp }}</h3>
    <div v-if="actionResult != []">
      <lin-row :gutter="20" v-if="resultsFirst != []">
        <lin-col :span="6" v-for="v in resultsFirst" :key="v.action">
          <TaskResult :taskName="v.action" :code="v.actionResultCode" :msg="v.actionResultMessage" :bCode="v.bilibiliCode" :bMsg="v.bilibiliMessage"/>
        </lin-col>
      </lin-row>
      <lin-row style="margin-top:20px" :gutter="20" v-if="resultsEnd != []">
        <lin-col :span="6" v-for="v in resultsEnd" :key="v.action">
          <TaskResult :taskName="v.action" :code="v.actionResultCode" :msg="v.actionResultMessage" :bCode="v.bilibiliCode" :bMsg="v.bilibiliMessage"/>
        </lin-col>
      </lin-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TaskResult from '@/components/TaskResult.vue'

export default {
  name: 'Status',
  components: {
    TaskResult
  },
  mounted() {
    this.current()
  },
  data() {
    return {
      actionResult: {},
      currentUser: '',
      coin: 0,
      currentExp: 0,
      currentLevel: 0,
      nextLevelExp: 0,
      needExp: 0,
      resultsFirst: [],
      resultsEnd: []
    }
  },
  methods: {
    current() {
      axios.get('/bilibili/current').then(res => {
        if (res.status === 200) {
          if (Object.keys(res.data.actionResult).length < 1) {
            axios.get('/bilibili/run').then(res => {
              if (res.status === 200) {
                this.current()
              }
            })
          }

          this.actionResult = res.data.actionResult
          this.currentUser = res.data.userInfo.uname
          this.coin = res.data.userInfo.money
          this.currentExp = res.data.userInfo.level_info.current_exp
          this.currentLevel = res.data.userInfo.level_info.current_level
          this.nextLevelExp = res.data.userInfo.level_info.next_exp_asInt
          this.needExp = this.nextLevelExp - this.currentExp

          if (Object.keys(this.actionResult).length > 4) {
            this.resultsFirst = Object.values(this.actionResult).slice(0, 4)
            this.resultsEnd = Object.values(this.actionResult).slice(4)
          } else {
            this.resultsFirst = Object.values(this.actionResult)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coin {
  font-size: 32px;
  color: skyblue;
}
</style>
