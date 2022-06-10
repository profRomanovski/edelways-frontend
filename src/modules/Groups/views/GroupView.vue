<template>
  <header-clild>
    <tabs>
      <tab label="Завдання" value="task" :checked="true" v-model="tab"></tab>
      <tab label="Теорія" value="theory" v-model="tab"></tab>
      <tab label="Люди" value="people" v-model="tab"></tab>
    </tabs>
    <template v-if="getIsAdmin">
      <admin-dropdown></admin-dropdown>
    </template>
  </header-clild>
  <div class="content">
    <image-box path="images/list.jpg" width="600px">
      <template v-if="tab === 'theory'">
        <theory-list :group-id="groupId"></theory-list>
      </template>
      <template v-if="tab === 'task'">
        <task-list :group-id="groupId"></task-list>
      </template>
      <template v-if="tab === 'people'">
        <users></users>
      </template>
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
import TaskList from "@/modules/Task/components/TaskList";
import Users from "@/modules/User/views/Users";

export default {
  name: "GroupView",
  components: {Users, TaskList, AdminDropdown, TheoryList, ImageBox, Tab, Tabs, HeaderClild},
  data(){
    return{
      groupId: this.$route.params.id,
      tab: 'task'
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