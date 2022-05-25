<template>
  <div class="dropdown">
    <template v-if="!getToken">
       <img src="@/assets/images/user.svg" alt="logo" width="52" height="55">
    </template>
    <template v-else>
      <img :src="getImagePath()" alt="logo" width="52" height="55">
    </template>
    <div class="dropdown-content">
      <template v-if="!getToken">
       <router-link to="/login">Вхід</router-link>
       <router-link to="/registration">Реєстрація</router-link>
      </template>
      <template v-else>
        <div class="profile">
        <h1>Вітаємо,<br> {{getName}}</h1>
        <div class="button-container">
          <submit-button title="Профіль"></submit-button>
        </div>
        <div class="button-container">
          <submit-button @click="logout" title="Вийти"></submit-button>
        </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import config from "@/config";
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
import { useCookies } from "vue3-cookies";

export default {
  name: "user-menu",
  components: {SubmitButton},
  methods:{
    ...mapGetters(['getUserToken', 'getUserName', 'getUserImage']),
    ...mapActions(['loadUserData']),
    ...mapMutations(['setToken']),
    getImagePath(){
      let hostname = config.hostname;
      return  hostname+this.getUserImage()
    },
    logout(){
      document.cookie = "Token=;"
      this.setToken("")
    }
  },
  computed:{
    getToken(){
      return this.getUserToken()
    },
    getName(){
      return this.getUserName()
    },
  },
  beforeUpdate() {
    if(this.getToken){
      this.loadUserData()
      console.log("load user data")
    }
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    this.setToken(this.cookies.get("Token"))
  }

}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 125px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {background-color: #f1f1f1}

img{
  border-radius: 50%;
}
.button-container{
  height: 30px;
}
.profile{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 110px;
}
h1{
  font-size: 18px;
}
</style>