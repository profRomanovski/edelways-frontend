<template>
  <div v-if="isActive" class="modal-general">
    <div class="modal-view">
      <div class="content">
        <icon name="close-white" @click="toggleModal" class="close-btn close-btn-view"></icon>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
export default {
  name: "ModalView",
  components: {Icon},
  props:{
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    toggleModal(){
      this.$emit("toggleModal")
    }
  }
}
</script>

<style scoped>
.modal-general {
  background-color: rgba(19, 15, 64, .4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
}
@media screen and (orientation: landscape ) {
  .close-btn-view {
    right: 510px;
    top: 30px
  }
}
</style>