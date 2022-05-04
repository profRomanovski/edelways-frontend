<template>
  <header-main></header-main>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
import HeaderMain from "@/modules/Main/components/header/HeaderMain";
export default {
  name: "MainLayout",
  components: {HeaderMain}
}
</script>

<style scoped>
.content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  min-height: 500px;
}
</style>