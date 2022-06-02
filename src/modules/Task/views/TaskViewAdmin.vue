<template>
<header-clild>
  <task-header :task="getTaskFromStorage"></task-header>
</header-clild>
  <div class="content">
    <image-box path="images/list.jpg" width="600px">
    <div class="list" v-if="getCompletesFromStorage">
      <template v-for="complete in getCompletesFromStorage" :key="complete.id">
        <complete-list-item :complete="complete"></complete-list-item>
      </template>
    </div>
    </image-box>
  </div>
</template>

<script>
import getErrorText from "@/modules/Framework/services/ErrorService";
import router from "@/modules/Framework/router";
import {mapActions, mapGetters} from "vuex";
import config from "@/config";
import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import TaskHeader from "@/modules/Task/components/header/TaskHeader";
import ImageBox from "@/modules/Main/components/boxes/ImageBox";
import CompleteListItem from "@/modules/Task/components/CompleteListItem";

export default {
  name: "TaskViewAdmin",
  components: {CompleteListItem, ImageBox, TaskHeader, HeaderClild},
  methods: {
    ...mapActions(['loadCompletes', 'loadTask']),
    ...mapGetters(['getCompletes', 'getTask']),
  },
  computed: {
    getCompletesFromStorage() {
      return this.getCompletes()
    },
    getTaskFromStorage() {
      return this.getTask()
    },
  },
  data() {
    return {
      taskId: this.$route.params.id,
      hostname: config.hostname,
      document_path: ""
    }
  },
  async mounted() {
    await this.loadCompletes(this.taskId)
        .catch((res) => {
          this.$toast.error(getErrorText(res.response))
          router.back()
        });
    await this.loadTask(this.taskId)
        .catch((res) => {
          this.$toast.error(getErrorText(res.response))
          router.back()
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
.content{
  justify-content: flex-start;
}
</style>