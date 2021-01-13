<template>
  <div>
    <h1>QRCode</h1>
    <div id="qrCode" class="qr" ref="qrCodeDiv"></div>
    <div class="buttons">
      <lin-button class="btn" icon="lin-icon-loading" type="primary" @click="qrCode">Reset</lin-button>
      <lin-button class="btn" icon="lin-icon-thumbsup" type="success" @click="scanSuccess">Done</lin-button>
    </div>
  </div>
</template>

<script>
import QR from 'qrcodejs2'
import axios from 'axios'

export default {
  name: 'QRCode',
  mounted() {
    this.qrCode()
  },
  data() {
    return {
      url: '',
      oauthKey: ''
    }
  },
  methods: {
    qrCode() {
      this.$refs.qrCodeDiv.innerHTML = ''
      axios.get('/bilibili/loginCode').then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.url = res.data.data.url
          this.oauthKey = res.data.data.oauthKey

          /* eslint-disable no-new */
          new QR('qrCode', {
            width: 200,
            height: 200,
            text: this.url === '' ? 'https://www.bilibili.com/' : this.url
          })
          this.$Message({
            showClose: true,
            message: 'Reset successfully',
            type: 'success'
          })
        } else {
          this.$Message.error('error:' + res.status)
        }
      })
    },
    scanSuccess() {
      axios.get('/bilibili/loginInfo?oauthKey=' + this.oauthKey).then(res => {
        console.log(res)
        if (res.status === 200) {
          if (res.data === 'success') {
            this.$Message({
              showClose: true,
              message: 'Login successfully',
              type: 'success'
            })
          } else {
            this.$Message.error(res.data)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qr {
  margin: 0 auto;
  width: 200px;
  height: 200px;
}
.buttons {
  margin-top: 20px;
  .btn {
    margin: 10px 10px;
  }
}
</style>
