<template>
  <header-clild>
    <review-header :complete="getCompleteFromStorage"></review-header>
  </header-clild>
  <div class="content">
    <div class="task-content" v-if="getCompleteFromStorage">
      <iframe class="view"
              :src="getDocumentPath"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
      <form-general
          path="images/task-review.jpg"
          submitTitle="Оцінити"
          class="form"
          @submitForm="reviewTaskAction"
      >
        <h1>Перевірка</h1>
        <input-text-number
            :label="'Оцінка (макс. '+getCompleteFromStorage.maxMark+')'" min="1"
            :max="getCompleteFromStorage.maxMark"
            v-model="mark"
        >
        </input-text-number>
        <input-area v-model="comment" label="Коментар" rows="10"></input-area>
      </form-general>
    </div>
  </div>
</template>

<script>
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputTextNumber from "@/modules/Main/components/form/InputTextNumber";
import InputArea from "@/modules/Main/components/form/InputArea";
import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import ReviewHeader from "@/modules/Task/components/header/ReviewHeader";
import {mapActions, mapGetters} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
import config from "@/config";
import router from "@/modules/Framework/router";
export default {
  name: "TaskReview",
  components: {ReviewHeader, HeaderClild, InputArea, InputTextNumber, FormGeneral},
  methods: {
    ...mapActions(['loadComplete', 'reviewTask']),
    ...mapGetters(['getComplete']),
    reviewTaskAction(){
      const params = {
        complete_id: this.getCompleteFromStorage.id,
        mark: this.mark,
        comment: this.comment
      }
      this.reviewTask(params)
          .then(()=>{
            this.$toast.success('Робота перевірена успішно')
            router.back()
          })
          .catch((res) =>{
            this.$toast.error(getErrorText(res.response))
          })
    }
  },
  computed: {
    getCompleteFromStorage() {
      return this.getComplete()
    },
    getDocumentPath() {
      return "https://docs.google.com/viewerng/viewer?url=" + this.hostname + this.getCompleteFromStorage.document_path
    },
  },
  data() {
    return {
      completeId: this.$route.params.id,
      hostname: config.hostname,
      mark: 1,
      comment: ""
    }
  },
  async mounted() {
    await this.loadComplete(this.completeId)
        .catch((res) => {
          this.$toast.error(getErrorText(res.response))
          router.back()
        })
    this.mark =  this.getCompleteFromStorage.mark
    this.comment = this.getCompleteFromStorage.comment
  }
}
</script>

<style scoped>
.content {
  justify-content: flex-start;
}
.task-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.view {
  width: 65%;
  height: 1000px;
  margin-top: 3px;
  background-color: #D1D1D1;
}
h1 {
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
}
.form{
  max-width: 350px;
  height: 100%;
}
@media screen and (orientation: portrait ){
  .view {
    width: 100%;
  }
}
</style>