<template>
  <div class="header-child">
    <div class="header-container">
      <icon name="menu" @click="toggleSidebar" class="icon" size="25px"></icon>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
import {mapActions} from "vuex";
export default {
  name: "HeaderClild",
  components: {Icon},
  methods: {
    ...mapActions(['toggleSidebar']),
  },
}
</script>

<style scoped>
.header-child{
  height: 40px;
  box-shadow: 0 4px 2px -2px gray;
}
.header-container{
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.icon{
  margin-left: 12px;
}
.icon:hover{
  cursor: pointer;
}
</style>