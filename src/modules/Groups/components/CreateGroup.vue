<template>
    <form-general
        path="images/create-group.jpg"
        submitTitle="Створити"
        @submitForm="createGroupAction"
    >
      <input-text v-model="name" input-type="text" label="Назва"></input-text>
    </form-general>
</template>

<script>
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputText from "@/modules/Main/components/form/InputText";
import {mapActions} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
export default {
  name: "CreateGroup",
  components: {InputText, FormGeneral},
  data(){
    return{
      name: ""
    }
  },
  methods:{
    ...mapActions(['createGroup']),
    createGroupAction(){
      this.createGroup(this.name)
          .then(()=>{
            this.$toast.info(`Група створена успішно`)
            this.$emit("toggleModal")
          })
          .catch((res) =>{
            this.$toast.error(`Відбулась помилка під час створення групи`+getErrorText(res.response))
          })
    }
  }
}
</script>

<style scoped>
</style>