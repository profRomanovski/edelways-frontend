<template>
  <div class="content">
    <form-general
        path="images/create-theory.jpg"
        submitTitle="Додати"
        @submitForm="createTheoryAction"
    >
      <input-text-icon icon="theory" v-model="name" input-type="text" label="Назва"></input-text-icon>
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
export default {
  name: "CreateTheory",
  components: {FileUploader, InputTextIcon, FormGeneral},
  data(){
    return{
      name: "",
      filePath: "",
      groupId: null
    }
  },
  methods:{
    ...mapActions(['createTheory']),
    ...mapGetters(['getGroup']),
    uploaded(path){
      this.filePath = path
    },
    createTheoryAction(){
      const params = {
        name: this.name,
        group_id: this.groupId,
        document_path: this.filePath
      }
      this.createTheory(params)
          .then(()=>{
            this.$toast.info('Теорію успішно додано')
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