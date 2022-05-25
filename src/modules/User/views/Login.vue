<template>
  <div class="content">
    <form-general
        path="images/register-form.png"
        submitTitle="Вхід"
        @submitForm="loginAction"
    >
      <input-text v-model="email" input-type="email" label="Електронна пошта"></input-text>
      <input-text v-model="password" input-type="password" label="Пароль"></input-text>
    </form-general>
  </div>
</template>

<script>
import router from "@/modules/Framework/router";
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputText from "@/modules/Main/components/form/InputText";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Register",
  components: {InputText, FormGeneral},
  methods:{
    ...mapActions(['login']),
    ...mapGetters(['getUserToken']),
    loginAction(){
      const credentials = {
        email: this.email,
        password: this.password,
      }
      this.login(credentials)
          .then(()=>{
            this.$toast.info(`Ви ввійшли в профіль`)
            router.push("/")
          })
          .catch((res)=>{
            this.$toast.error(res.response.data.message)
            console.log(res.response)
          })
    },
  },
  data(){
    return{
      email: "",
      password: ""
    }
  },
  beforeMount() {
    console.log(this.getUserToken())
    if(this.getUserToken()){
      router.push("/")
      this.$toast.info(`Ви вже ввійшли в профіль`)
    }
  }
}
</script>

<style scoped>

</style>