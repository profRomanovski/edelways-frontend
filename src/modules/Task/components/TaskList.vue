<template>
<div class="list">
  <template v-for="task in getTasksFromStorage" :key="task.id">
    <task-list-item :task="task" iconSize="45px"></task-list-item>
  </template>
</div>
</template>

<script>
import TaskListItem from "@/modules/Task/components/TaskListItem";
import {mapActions, mapGetters} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
export default {
  name: "TaskList",
  components: {TaskListItem},
  methods:{
    ...mapActions(['loadTasks']),
    ...mapGetters(['getTasks'])
  },
  props:{
    groupId: Number
  },
  computed:{
    getTasksFromStorage(){
      return this.getTasks()
    }
  },
  mounted() {
    this.loadTasks(this.groupId)
        .catch((res)=>{
          this.$toast.error(getErrorText(res.response))
        })
  }
}
</script>

<style scoped>
.list{
  display: flex;
  flex-direction: column;
  gap:15px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}
</style>