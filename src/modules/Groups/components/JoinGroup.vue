<template>
  <form-general
      path="images/join-group.jpg"
      submitTitle="Приєднатись"
      @submitForm="joinGroupAction"
  >
    <input-text v-model="code" input-type="text" label="Код"></input-text>
  </form-general>
</template>

<script>
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputText from "@/modules/Main/components/form/InputText";
import {mapActions} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
export default {
  name: "JoinGroup",
  components: {InputText, FormGeneral},
  data(){
    return{
      code: ""
    }
  },
  methods:{
    ...mapActions(['createGroup', 'joinGroup']),
    joinGroupAction(){
      this.joinGroup(this.code)
          .then(()=>{
            this.$toast.info(`Ви успішно приєдналися до групи`)
            this.$emit("toggleModal")
          })
          .catch((res) =>{
            this.$toast.error(getErrorText(res.response))
          })
    }
  }
}
</script>

<style scoped>

</style>