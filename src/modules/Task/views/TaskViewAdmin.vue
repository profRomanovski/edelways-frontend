<template>
<header-clild>
  <task-header :task="getTaskFromStorage"></task-header>
  <template v-if="getTaskFromStorage && getTaskFromStorage.isAdmin">
    <icon name="delete-group" class="icon" @click="deleteTaskAction" size="20px"></icon>
  </template>
</header-clild>
  <div class="content">
    <image-box path="images/list.jpg" width="600px">
    <div class="list" v-if="getCompletesFromStorage">
      <template v-for="complete in getCompletesFromStorage" :key="complete.id">
        <complete-list-item :complete="complete"></complete-list-item>
      </template>
    </div>
    </image-box>
    <div class="task-and-history" v-if="getTaskFromStorage">
    <image-box path="images/task-view.jpg" width="500px" class="image-box">
      <div class="labels">
        <h1>Завдання</h1>
        <span>{{getTaskFromStorage.description}}</span>
        <a :href="getDocumentPath" target="_blank" class="underline" v-if="getTaskFromStorage.document_path">
          <span>Переглянути вкладений документ</span>
        </a>
      </div>
    </image-box>
      <empty-box class="comments" width="500px">
        <h1>Історія</h1>
        <template v-for="comment in getTaskFromStorage.comments" :key="comment.key">
          <comment-item :comment="comment"></comment-item>
        </template>
      </empty-box>
    </div>
  </div>
  <template v-if="showMessage">
    <yes-no-message :modal-view="showMessage" @toggleMessage="toggleMessage" :text="text"
                    @yesAction="yesAction">
    </yes-no-message>
  </template>
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
import Icon from "@/modules/Framework/components/Icon";
import YesNoMessage from "@/modules/Main/components/messages/yesNoMessage";
import EmptyBox from "@/modules/Main/components/boxes/EmptyBox";
import CommentItem from "@/modules/Task/components/CommentItem";

export default {
  name: "TaskViewAdmin",
  components: {CommentItem, EmptyBox, YesNoMessage, Icon, CompleteListItem, ImageBox, TaskHeader, HeaderClild},
  methods: {
    ...mapActions(['loadCompletes', 'loadTask', 'deleteTask']),
    ...mapGetters(['getCompletes', 'getTask']),
    toggleMessage(){
      this.showMessage = !this.showMessage
    },
    deleteTaskAction(){
      this.showMessage = true;
      this.text = 'Ви дійсно хочете видалити завдання '+this.getTaskFromStorage.name+'?';
    },
    yesAction(){
      this.deleteTask(this.getTaskFromStorage.id)
          .then(()=>{
            this.$toast.success('Завдання видалено успішно')
            this.showMessage = false
            router.back()
          })
          .catch((res)=>{
            this.$toast.error(getErrorText(res.response))
            this.showMessage = false
          })
    },
  },
  computed: {
    getCompletesFromStorage() {
      return this.getCompletes()
    },
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
      document_path: "",
      showMessage: false,
      text: ""
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
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.icon {
  cursor: pointer;
}

.labels {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
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
.image-box {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.1rem;
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
.task-and-history{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 25px;
  width: 500px;
}
.comments{
  box-shadow: none;
}
</style>