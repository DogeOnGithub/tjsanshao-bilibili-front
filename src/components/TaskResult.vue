<template>
  <div class="grid-content">
    <div :class="{'status-success': code === 0, 'status-warn': code === -9999, 'status-error': code != -9999 && code != 0}" class="inner-content"></div>
    <div class="title inner-content">{{ taskName }}</div>
    <div class="status-code inner-content">code = {{ code }}</div>
    <div v-if="code != -9999" class="bilibili-code inner-content">B-Code = {{ bCode }}</div>
    <div class="msg inner-content">{{ msg }}</div>
    <div class="bilibili-msg inner-content">{{ bMsg }}</div>
  </div>
</template>

<script>
export default {
  name: 'TaskResult',
  props: ['taskName', 'code', 'msg', 'bCode', 'bMsg']
}
</script>

<style lang="scss">
.grid-content {
  border-radius: 6px;
  border-bottom-style: solid;
  border-bottom-color: green;
  box-shadow: 1px 1px 3px #000;
  .inner-content {
    position: relative;
    top: 20px;
    left: 5%;
    margin-bottom: 10px;
  }
  .status-success {
    width: 90%;
    height: 5px;
    border-radius: 2px;
    background-color: greenyellow;
  }
  .status-warn {
    width: 90%;
    height: 5px;
    border-radius: 2px;
    background-color: yellow;
  }
  .status-error {
    width: 90%;
    height: 5px;
    border-radius: 2px;
    background-color: red;
  }
  .title {
    font-size: 24px;
    text-align: left;
  }
  .status-code {
    font-size: 20px;
    text-align: left;
  }
  .msg {
    width: 90%;
    font-size: 16px;
    text-align: left;
  }
  .bilibili-code {
    font-size: 20px;
    text-align: left;
  }
  .bilibili-msg {
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
  }
}
</style>
