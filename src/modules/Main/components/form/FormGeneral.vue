<template>
    <div class="form-general">
      <div class="card-image"
      :style="{backgroundImage: 'url('+getImage(path)+')'}"/>
      <form class="card-form" v-on:submit.prevent="submit">
        <div class="form-container">
          <slot></slot>
          <div class="submit-button">
            <submit-button :title="this.submitTitle" @click="submitEvent"></submit-button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
export default {
  name: "FormGeneral",
  components: {SubmitButton},
  methods:{
    getImage(path){
      return require("@/assets/"+path)
    },
    submitEvent(){
      this.$emit("submitForm")
    }
  },
  props:{
    path: String,
    submitTitle: String
  }
}
</script>

<style scoped>
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  font-family: "DM Sans", sans-serif;
  line-height: 1.5;
  background-color: #f1f3fb;
  padding: 0 2rem;
}

img {
  max-width: 100%;
  display: block;
}

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
}

.form-general {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.1rem;
}

.card-image {
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 35%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 5%;
  position: relative;
}
.form-container{
  width: 90%;
  margin: 0 auto 10px;
  display: flex;
  align-content: space-around;
  flex-direction: column;
  height: 100%;
}
.submit-button{
  height: 40px;
  margin-top: 20px;
}
</style>