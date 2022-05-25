<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="toggleSidebar" v-if="isSidebarOpen"></div>
    <transition name="slide">
      <div v-if="isSidebarOpen"
           class="sidebar-panel">
        <icon name="close" @click="toggleSidebar" class="close-btn"></icon>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>

import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(['isSidebarOpen'])
  },
  methods: {
    ...mapActions(['toggleSidebar']),
  },
}
</script>
<style>
.slide-enter-active,
.slide-leave-active
{
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s
}


.sidebar-backdrop {
  background-color: rgba(19, 15, 64, .4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #F5F6F3;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 90;
  padding: 3rem 20px 2rem 20px;
  width: 200px;
}
.close-btn{
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition-duration: 0.4s;
}
.close-btn:active{
  top: 2px
}
</style>