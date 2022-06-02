<template>
<div class="item" @click="taskView">
  <img :src="getImagePath()" alt="logo" width="52" height="55">
  <div class="labels">
    <span>{{complete.author}}</span>
    <div class="labels-footer">
      <span v-if="complete.mark === ''">Здано</span>
      <span v-if="complete.mark !== ''">Перевірено</span>
      <span>{{complete.date}}</span>
    </div>
  </div>
</div>
</template>

<script>
import router from "@/modules/Framework/router";
import config from "@/config";
export default {
  name: "CompleteListItem",
  components: {},
  props:{
    complete: Object,
  },
  methods:{
    taskView(){
      console.log('hello')
      router.push('/task-review/'+this.complete.id)
    },
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
  max-height: 60px;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #ECEDEF;
  border-radius: 10px;
  gap: 15px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}
.labels{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 10px;
  width: 100%;
}
.labels-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
img{
  border-radius: 50%;
}
</style>