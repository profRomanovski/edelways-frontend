<template>
  <div class="dropdown">
  <icon name="group-menu" class="icon" size="20px"></icon>
  <dropdown>
    <custom-link to="/create-task" title="Створити завдання"></custom-link>
    <custom-link to="/create-theory" title="Додати теорію"></custom-link>
    <custom-link to="/invite-view" title="Додати користувача"></custom-link>
  </dropdown>
  </div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
import Dropdown from "@/modules/Main/components/dropdown/Dropdown";
import CustomLink from "@/modules/Main/components/dropdown/CustomLink";
export default {
  name: "AdminDropdown",
  components: {CustomLink, Dropdown, Icon}
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
}
.icon{
  cursor: pointer;
}
</style>