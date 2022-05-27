<template>
  <header-clild>
    <tabs>
      <tab label="Завдання" value="all" v-model="tab"></tab>
      <tab label="Теорія" value="my" :checked="true" v-model="tab"></tab>
      <tab label="Люди" value="people" v-model="tab"></tab>
    </tabs>
    <template v-if="getIsAdmin">
      <admin-dropdown></admin-dropdown>
    </template>
  </header-clild>
  <div class="content">
    <image-box path="images/list.jpg" width="600px">
      <theory-list :group-id="groupId"></theory-list>
    </image-box>
  </div>
</template>

<script>
import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import Tabs from "@/modules/Main/components/tabs/Tabs";
import Tab from "@/modules/Main/components/tabs/Tab";
import {mapActions, mapGetters} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
import router from "@/modules/Framework/router";
import ImageBox from "@/modules/Main/components/boxes/ImageBox";
import TheoryList from "@/modules/Theory/components/TheoryList";
import AdminDropdown from "@/modules/Groups/components/AdminDropdown";

export default {
  name: "GroupView",
  components: {AdminDropdown, TheoryList, ImageBox, Tab, Tabs, HeaderClild},
  data(){
    return{
      groupId: this.$route.params.id,
    }
  },
  methods:{
    ...mapActions(['loadGroup']),
    ...mapGetters(['getGroup'])
  },
  computed:{
    getIsAdmin(){
      if(this.getGroup()){
        return this.getGroup().isAdmin
      } else {
        return false
      }
    }
  },
  async mounted() {
    this.loadGroup(this.groupId)
        .catch((res)=>{
          this.$toast.error(getErrorText(res.response))
          router.push('/')
        })
  }
}
</script>

<style scoped>
.content{
  justify-content: flex-start;
}
</style>