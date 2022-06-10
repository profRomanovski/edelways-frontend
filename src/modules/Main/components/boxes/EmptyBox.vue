<template>
  <div class="box-general">
      <div class="box-container">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: "EmptyBox",
  props:{
    path: String,
    width: {
      type: String,
      default: "500px"
    }
  },
  data(){
    return{
      widthBox: this.width
    }
  }
}
</script>

<style scoped>
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  font-family: "DM Sans", sans-serif;
  line-height: 1.5;
  background-color: #f1f3fb;
  padding: 0 2rem;
}

img {
  max-width: 100%;
  display: block;
}

.box-general {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: v-bind(widthBox);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.1rem;
}

.box-container{
  width: 100%;
  margin: 0 auto 10px;
  display: flex;
  gap: 15px;
  align-content: space-around;
  flex-direction: column;
  height: 100%;
}
</style>