<template>
  <div id="login">
    <QRCode/>
  </div>
</template>

<script>
import QRCode from '@/components/QRCode.vue'

export default {
  name: 'Login',
  components: {
    QRCode
  }
}
</script>
