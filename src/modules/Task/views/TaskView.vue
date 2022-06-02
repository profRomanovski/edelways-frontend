<template>
  <header-clild>
  <task-header :task="getTaskFromStorage"></task-header>
    <span class="mark" v-if="getTaskFromStorage && getTaskFromStorage.complete && getTaskFromStorage.complete.mark">
      {{getTaskFromStorage.complete.mark}}/{{getTaskFromStorage.mark}}
    </span>
    <span class="mark" v-else-if="getTaskFromStorage">
      /{{getTaskFromStorage.mark}}
    </span>
  </header-clild>
  <div class="content">
    <template v-if="getTaskFromStorage">
      <div class="task-content">
        <image-box path="images/task-view.jpg" width="600px" class="image-box">
          <div class="labels">
            <h1>Завдання</h1>
            <span>{{getTaskFromStorage.description}}</span>
            <a :href="getDocumentPath" target="_blank" class="underline" v-if="getTaskFromStorage.document_path">
              <span>Переглянути вкладений документ</span>
            </a>
          </div>
        </image-box>
        <form-general
            path="images/task_view_work1.jpg"
            submitTitle="Здати"
            @submitForm="completeTaskAction"
        >
          <h1>Моя робота</h1>
          <h2 v-if="getTaskFromStorage.complete">Здано: {{getTaskFromStorage.complete.document}}</h2>
          <file-uploader @uploaded="uploaded" dir-name="task-completes"></file-uploader>
        </form-general>
      </div>
    </template>
  </div>
</template>
<script>

import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import ImageBox from "@/modules/Main/components/boxes/ImageBox";
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import FileUploader from "@/modules/Main/components/form/FileUploader";
import getErrorText from "@/modules/Framework/services/ErrorService";
import router from "@/modules/Framework/router";
import {mapActions, mapGetters} from "vuex";
import TaskHeader from "@/modules/Task/components/header/TaskHeader";
import config from "@/config";

export default {
  name: "TaskView",
  components: {TaskHeader, FileUploader, FormGeneral, ImageBox, HeaderClild},
  methods: {
    ...mapActions(['loadTask', 'completeTask']),
    ...mapGetters(['getTask']),
    uploaded(path){
      this.document_path = path;
    },
    completeTaskAction(){
      const params = {
        task_id: this.getTaskFromStorage.id,
        document_path: this.document_path
      }
      this.completeTask(params)
          .then(()=>{
            this.$toast.success('Робота здана успішно')
          })
          .catch((res) =>{
            this.$toast.error(getErrorText(res.response))
          })
    }
  },
  computed: {
    getTaskFromStorage() {
      return this.getTask()
    },
    getDocumentPath() {
      return "https://docs.google.com/viewerng/viewer?url=" + this.hostname + this.getTaskFromStorage.document_path
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
    await this.loadTask(this.taskId)
        .catch((res) => {
          this.$toast.error(getErrorText(res.response))
          router.back()
        })
  }
}
</script>

<style scoped>
.content {
  justify-content: flex-start;
}

.task-content {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
}

.image-box {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.1rem;
}

.labels {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}

h1 {
  font-size: 22px;
  text-align: center;
  padding-bottom: 10px;
}
a{
  text-decoration: none;
  color: #2777b4;
}

.underline{
  position: relative;
}

.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #0074D9;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
.mark{
  font-size:18px;
}
</style>
