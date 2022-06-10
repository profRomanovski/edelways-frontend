<template>
  <div class="dropdown">
    <template v-if="!getToken">
       <img src="@/assets/images/user.svg" alt="logo" width="52" height="55">
    </template>
    <template v-else>
      <img :src="getImagePath()" alt="logo" width="52" height="55">
    </template>
    <dropdown>
      <template v-if="!getToken">
        <custom-link title="Вхід" to="/login"></custom-link>
        <custom-link to="/registration" title="Реєстрація"></custom-link>
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
    </dropdown>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import config from "@/config";
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
import { useCookies } from "vue3-cookies";
import Dropdown from "@/modules/Main/components/dropdown/Dropdown";
import CustomLink from "@/modules/Main/components/dropdown/CustomLink";

export default {
  name: "user-menu",
  components: {CustomLink, Dropdown, SubmitButton},
  methods:{
    ...mapGetters(['getUserToken', 'getUserName', 'getUserImage']),
    ...mapActions(['loadUserData']),
    ...mapMutations(['setToken', 'setFilter']),
    getImagePath(){
      let hostname = config.hostname;
      return  hostname+this.getUserImage()
    },
    logout(){
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
    const token = this.cookies.get("Token")
    if(token === "null" || token === null){
      this.setToken("")
    } else {
      this.setToken(token)
    }

    this.setFilter(this.cookies.get('Filter'))
  }

}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

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
  min-width: 130px;
  padding: 5px;
}
h1{
  font-size: 18px;
}
</style>