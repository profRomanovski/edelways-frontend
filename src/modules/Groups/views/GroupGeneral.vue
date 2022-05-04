<template>
  <img src="@/assets/images/found-group.png" alt="find-group">
  <span>Ви не приєданні до жодної групи</span>
  <div class="submit-button">
    <submit-button title="Приєднатись" @click="onClick"></submit-button>
  </div>
</template>

<script>
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
export default {
  name: "GroupGeneral",
  components: {SubmitButton},
  methods: {
    onClick() {
      console.log("heelo")
    }
  }
}
</script>

<style scoped>
span{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
}
.submit-button{
  min-width: 200px;
  height: 50px;
}
</style>