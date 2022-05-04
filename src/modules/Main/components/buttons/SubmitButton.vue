<template>
  <button>{{title}}</button>
</template>

<script>
export default {
  name: "SubmitButton",
  props:{
    title: String
  }
}
</script>

<style scoped>
button{
  background: #2794B5;
  border-radius: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: white;
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
}

button:active{
  background: #37a5c8;
}
</style>