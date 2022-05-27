<template>
  <div class="dropdown-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Dropdown"
}
</script>

<style scoped>
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 125px;
  right: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
  border-radius: 5px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>