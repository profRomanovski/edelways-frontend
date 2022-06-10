<template>
  <template v-if="getGroupsCount > 0">
    <div class="container">
      <nav class="side-nav">
        <ul class="nav-menu">
          <template v-for="group in getGroupsFromStorage" :key="group.id">
            <li v-if="getGroupFromStorage && group.id === getGroupFromStorage.id"
                @click="toggleSidebar"
                class="nav-item active">
              <router-link :to="'/view/'+group.id" :key="group.id">
              <span class="menu-text">{{ group.name }}</span>
            </router-link></li>
            <li v-else @click="toggleSidebar"
                class="nav-item"> <router-link :to="'/view/'+group.id" :key="group.id">
              <span class="menu-text">{{ group.name }}</span>
            </router-link></li>
          </template>
        </ul>
      </nav>
    </div>
  </template>
  <template v-else>
    <template v-if="getFilterFromStorage === 'all'">
    <h1>У вас немає приєднаних груп</h1>
    </template>
    <template v-else>
      <h1>У вас немає створених груп</h1>
    </template>
  </template>
  <div class="button-container">
    <template v-if="getFilterFromStorage === 'my'">
    <submit-button title="Створити" @click="createGroup"></submit-button>
    </template>
    <template v-else>
      <submit-button title="Приєднатись" @click="joinGroup"></submit-button>
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
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
import {mapActions, mapGetters} from "vuex";
import ModalView from "@/modules/Main/components/modals/ModalView";
import CreateGroup from "@/modules/Groups/components/CreateGroup";
import router from "@/modules/Framework/router";
import JoinGroup from "@/modules/Groups/components/JoinGroup";
export default {
  name: "SlideContent",
  components: {JoinGroup, CreateGroup, ModalView, SubmitButton},
  methods:{
    ...mapGetters(['getGroups', 'getUserToken', 'getFilter', 'getGroup']),
    ...mapActions(['toggleSidebar', "loadGroups"]),
    createGroup(){
      if (this.getUserToken()) {
        this.toggleModalCreate()
      } else {
        router.push('/login')
        this.toggleSidebar()
        this.$toast.info(`Щоб створити групу необхідно увійти`)
      }
    },
    joinGroup(){
      if (this.getUserToken()) {
        this.toggleModalJoin()
      } else {
        router.push('/login')
        this.toggleSidebar()
        this.$toast.info(`Щоб приєднатись необхідно увійти`)
      }
    },
    toggleModalCreate(){
      this.modalViewCreate = !this.modalViewCreate
    },
    toggleModalJoin(){
      this.modalViewJoin = !this.modalViewJoin
    }
  },
  data(){
    return{
      modalViewCreate: false,
      modalViewJoin: false
    }
  },
  computed:{
    getGroupsFromStorage(){
      return this.getGroups()
    },
    getGroupsCount(){
      return this.getGroups().length
    },
    getFilterFromStorage(){
      return this.getFilter()
    },
    getGroupFromStorage(){
      return this.getGroup()
    }
  },
  async mounted() {
    await this.loadGroups(this.getFilterFromStorage)
  }
}
</script>

<style scoped>
.container {
}
.side-nav,
.nav-menu {
  height: 100%;
}
.side-nav .nav-menu {
  list-style: none;
  padding: 30px 0;
  width: 200px;
  background-color: #3498db;
}
.side-nav .nav-item {
  position: relative;
  padding: 10px 0;
}
.nav-item.active {
  background-color: #F5F6F3;
  box-shadow: 0px -3px rgba(0, 0, 0, 0.2), 0px 3px rgba(0, 0, 0, 0.2);
}
.nav-item.active a {
  color: #2980b9;
}
.nav-item a {
  text-decoration: none;
  color: #F5F6F3;
}
.menu-text {
  padding: 0 20px;
}
.side-nav .nav-item.active::before {
  content: "";
  position: absolute;
  background-color: transparent;
  bottom: 100%;
  right: 0;
  height: 150%;
  width: 20px;
  border-bottom-right-radius: 25px;
  box-shadow: 0 20px 0 0 #F5F6F3;
}
.side-nav .nav-item.active::after {
  content: "";
  position: absolute;
  background-color: transparent;
  top: 100%;
  right: 0;
  height: 150%;
  width: 20px;
  border-top-right-radius: 25px;
  box-shadow: 0 -20px 0 0 #F5F6F3;
}
.button-container{
  height: 35px;
  margin-top: 20px;
}
span{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
}
</style>