<template>
  <div class="content">
    <form-general
        path="images/create-task1.jpg"
        submitTitle="Додати"
        @submitForm="createTheoryAction"
    >
      <input-text-icon icon="task" v-model="name" input-type="text" label="Назва"></input-text-icon>
      <input-text v-model="mark" input-type="number" label="Максимальна кількість балів"></input-text>
      <input-area v-model="description" rows="5" cols="30" label="Опис"></input-area>
      <file-uploader @uploaded="uploaded" dir-name="theory"></file-uploader>
    </form-general>
  </div>
</template>

<script>
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputTextIcon from "@/modules/Main/components/form/InputTextIcon";
import FileUploader from "@/modules/Main/components/form/FileUploader";
import {mapActions, mapGetters} from "vuex";
import router from "@/modules/Framework/router";
import getErrorText from "@/modules/Framework/services/ErrorService";
import InputArea from "@/modules/Main/components/form/InputArea";
import InputText from "@/modules/Main/components/form/InputText";
export default {
  name: "TaskTheory",
  components: {InputText, InputArea, FileUploader, InputTextIcon, FormGeneral},
  data(){
    return{
      name: "",
      filePath: "",
      description: "",
      groupId: null,
      mark: 5
    }
  },
  methods:{
    ...mapActions(['createTask']),
    ...mapGetters(['getGroup']),
    uploaded(path){
      this.filePath = path
    },
    createTheoryAction(){
      const params = {
        name: this.name,
        description: this.description,
        group_id: this.groupId,
        document_path: this.filePath,
        mark: this.mark
      }
      this.createTask(params)
          .then(()=>{
            this.$toast.info('Завдання успішно додано')
            router.push('/view/'+this.groupId)
          })
          .catch((res)=>{
            this.$toast.error('Сталася помилка: '+getErrorText(res.response))
          })
    }
  },
  mounted() {
    if(this.getGroup() === null){
      this.$toast.error('Група не вибрана!')
      router.push('/')
    } else {
      this.groupId = this.getGroup().id
    }
  }
}
</script>

<style scoped>

</style>