<template>
<header>
  <div class="header-container">
    <div class="logo" @click="logoClick">
      <img src="@/assets/images/logo.png" alt="logo" width="52" height="55">
      <span>Edelways</span>
    </div>
    <div class="menu">
      <user-menu></user-menu>
    </div>
  </div>
</header>

</template>

<script>
import UserMenu from "@/modules/User/components/header/UserMenu";
import router from "@/modules/Framework/router";
export default {
  name: "HeaderMain",
  components: {UserMenu},
  methods:{
    logoClick(){
      router.push('/')
    }
  }
}
</script>

<style scoped>
header{
  height: 63px;
  background-color: #24292F;
}
.header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.logo{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 130px;
  cursor: pointer;
}
.logo span{
  color: white;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}
</style>