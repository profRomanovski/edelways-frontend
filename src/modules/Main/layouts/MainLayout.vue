<template>
  <header-main></header-main>
  <slide>
    <slide-content></slide-content>
  </slide>
  <slot></slot>
</template>

<script>
import HeaderMain from "@/modules/Main/components/header/HeaderMain";
import {mapMutations} from "vuex";
import { useCookies } from "vue3-cookies";
import Slide from "@/modules/Main/components/sidebar/Slide";
import SlideContent from "@/modules/Main/components/sidebar/SlideContent";

export default {
  name: "MainLayout",
  components: {SlideContent, Slide, HeaderMain},
  methods:{
    ...mapMutations(['setToken'])
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    this.setToken(this.cookies.get("Token"))
  }
}
</script>

<style>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
  margin-top: 15px;
}
</style>