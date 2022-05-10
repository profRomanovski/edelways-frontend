<template>

  <header-main></header-main>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
import HeaderMain from "@/modules/Main/components/header/HeaderMain";
import {mapMutations} from "vuex";
import { useCookies } from "vue3-cookies";

export default {
  name: "MainLayout",
  components: {HeaderMain},
  methods:{
    ...mapMutations(['setToken'])
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    setTimeout(this.$toast.clear, 3000)
    this.setToken(this.cookies.get("Token"))
  }
}
</script>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
  margin-top: 15px;
}
</style>