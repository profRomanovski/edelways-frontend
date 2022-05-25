<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabs"
}
</script>

<style scoped>
.tabs{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 40%;
  margin: 0 auto;
}
html {
  box-sizing: border-box;
}
</style>