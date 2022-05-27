<template>
  <router-link :to="to">{{ title }}</router-link>
</template>

<script>
export default {
  name: "CustomLink",
  props:{
    to: String,
    title: String
  }
}
</script>

<style scoped>
a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
a:hover {background-color: #f1f1f1}
</style>