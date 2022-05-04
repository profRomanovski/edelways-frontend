<template>
<header>
  <div class="header-container">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="logo" width="52" height="55">
      <span>Edelways</span>
    </div>
    <div class="menu">
      <img src="@/assets/images/user.svg" alt="logo" width="52" height="55">
    </div>
  </div>
</header>

</template>

<script>
export default {
  name: "HeaderMain"
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
}
.logo span{
  color: white;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}
</style>