<template>
  <div class="item" v-if="complete !== null">
    <img :src="getImagePath()" alt="logo" width="45" height="35">
    <div class="labels">
      <span class="title">{{complete.author}}</span>
      <div class="labels-footer">
        <span>Здано</span>
        <span>{{complete.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
export default {
  name: "ReviewHeader",
  components: {},
  props:{
    complete: Object
  },
  methods:{
    getImagePath(){
      let hostname = config.hostname;
      return  hostname+this.complete.image
    },
  }
}
</script>

<style scoped>
.item{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 30px;
  box-sizing: border-box;
  background: #FFFFFF;
  gap: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.labels{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 3px;
  width: 100%;
}
.labels-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  font-size: 14px;
}
.title{
  font-weight: bold;
}
@media screen and (orientation: landscape ){
  .item{
    margin-left: 100px;
  }
}
</style>