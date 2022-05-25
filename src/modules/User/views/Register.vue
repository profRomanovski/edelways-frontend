<template>
  <div class="content">
    <form-general
        path="images/register-form.png"
        submitTitle="Стоврити акаунт"
        @submitForm="register"
    >
      <input-text v-model="name" label="Ім'я"></input-text>
      <input-text v-model="email" input-type="email" label="Електронна пошта"></input-text>
      <input-text v-model="password" input-type="password" label="Пароль"></input-text>
      <input-text v-model="passwordConfirm" input-type="password" label="Підтвердити пароль"></input-text>
      <image-uploader @uploaded="setImage" dir-name="user"></image-uploader>
    </form-general>
  </div>
</template>

<script>
import router from "@/modules/Framework/router";
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputText from "@/modules/Main/components/form/InputText";
import ImageUploader from "@/modules/Main/components/form/ImageUploader";
import {mapActions} from "vuex";
export default {
  name: "Register",
  components: {ImageUploader, InputText, FormGeneral},
  methods:{
    ...mapActions(['createAccount']),
    register(){
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm,
        image: this.image
      }
      this.createAccount(user)
          .then(()=>{
            this.$toast.info(`Користувач успішно створений`)
            router.push("/login")
          })
          .catch((res)=>{
            this.$toast.error(res.response.data.message)
            console.log(res.response)
          })
    },
    setImage(image){
      this.image = image
    },
  },
  beforeUpdate() {
    if (this.getUserToken()) {
      router.push("/")
      this.$toast.info(`Ви вже ввійшли в профіль`)
    }
  },
  data(){
    return{
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      image: ""
    }
  },
}
</script>

<style scoped>

</style>