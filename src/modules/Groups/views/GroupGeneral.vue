<template>
  <header-clild>
    <tabs>
      <tab label="Приєднані" value="all" v-model="tab" :checked="true"></tab>
      <tab label="Створені" value="my" v-model="tab"></tab>
    </tabs>
  </header-clild>
  <div class="content groups">
    <template v-if="this.tab === 'my'">
      <group-list
          filter="my"
          label="Немає створених вами груп"
          action-label="Створити"
          @createGroupAction="createGroupAction"
      ></group-list>
    </template>
    <template v-else>
      <group-list
          filter="all"
          label="Немає приєднаних груп"
          action-label="Приєднатися"
          @joinGroupAction="joinGroupAction"
      ></group-list>
    </template>
  </div>
  <modal-view :is-active="modalViewCreate" @toggleModal="toggleModalCreate">
    <create-group @toggleModal="toggleModalCreate"></create-group>
  </modal-view>
  <modal-view :is-active="modalViewJoin" @toggleModal="toggleModalJoin">
    <join-group @toggleModal="toggleModalJoin"></join-group>
  </modal-view>
</template>

<script>
import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import Tabs from "@/modules/Main/components/tabs/Tabs";
import Tab from "@/modules/Main/components/tabs/Tab";
import GroupList from "@/modules/Groups/components/GroupList";
import ModalView from "@/modules/Main/components/modals/ModalView";
import CreateGroup from "@/modules/Groups/components/CreateGroup";
import JoinGroup from "@/modules/Groups/components/JoinGroup";
import {mapGetters, mapMutations} from "vuex";
import router from "@/modules/Framework/router";
export default {
  name: "GroupGeneral",
  components: {JoinGroup, CreateGroup, ModalView, GroupList, Tab, Tabs, HeaderClild},
  data(){
    return{
      tab: null,
      modalViewCreate: false,
      modalViewJoin: false
    }
  },
  methods: {
    ...mapGetters(['getUserToken']),
    ...mapMutations(['setFilter']),
    createGroupAction(){
      if (this.getUserToken()) {
        this.toggleModalCreate()
      } else {
        router.push('/login')
        this.$toast.info(`Щоб створити групу необхідно увійти`)
      }
    },
    joinGroupAction(){
      if (this.getUserToken()) {
        this.toggleModalJoin()
      } else {
        router.push('/login')
        this.$toast.info(`Щоб долучитись до групи необхідно увійти`)
      }
    },
    toggleModalCreate(){
      this.modalViewCreate = !this.modalViewCreate
    },
    toggleModalJoin(){
      this.modalViewJoin = !this.modalViewJoin
    }
  },
  updated() {
    this.setFilter(this.tab)
  }
}
</script>

<style scoped>
.groups{
  gap: 30px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  margin-left: 30px;
}
@media screen and (orientation: landscape) {
  .groups {
    margin-left: 30px;
  }
}
@media screen and (orientation: portrait ){
  .groups{
    justify-content: center;
  }
}
</style>