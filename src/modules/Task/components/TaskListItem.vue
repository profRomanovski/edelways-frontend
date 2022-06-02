<template>
<div class="item" @click="taskView">
<icon name="task" size="45px"></icon>
  <div class="labels">
    <div class="labels-footer">
      <span>{{task.name}}</span>
      <span v-if="task.isAdmin === false && task.complete">{{task.complete.mark}}/{{task.mark}}</span>
    </div>
    <div class="labels-footer">
      <span>{{task.date}}</span>
      <span>{{task.author}}</span>
    </div>
  </div>
</div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
import router from "@/modules/Framework/router";
export default {
  name: "TaskListItem",
  components: {Icon},
  props:{
    task: Object,
  },
  methods:{
    taskView(){
      if(this.task.isAdmin){
        router.push('/task-view-admin/'+this.task.id)
      } else {
        router.push('/task-view/'+this.task.id)
      }
    }
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
</style>