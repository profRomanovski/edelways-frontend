<template>
  <img class="icon" :src="getPath(this.name)" alt="icon"/>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      default: "menu"
    },
    size: {
      type: String,
      default: "30px"
    },
    color: {
      type: String,
      default: "black"
    }
  },
  data() {
    return {
      colorIcon: this.color,
      sizeIcon: this.size
    }
  },
  methods:{
    getPath(name){
      return require(`@/assets/icons/${name}.svg`)
    }
  }
}
</script>

<style scoped>
.icon{
  color: v-bind(colorIcon);
  width: v-bind(sizeIcon);
  height: v-bind(sizeIcon);
}
</style>