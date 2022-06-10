<template>
  <div class="list">
    <user-list-item :user="getUser" role="admin"></user-list-item>
    <template v-for="user in getGroupFromStorage.userList" :key="user.id">
      <user-list-item :user="user" iconSize="45px"></user-list-item>
    </template>
  </div>
</template>

<script>
import UserListItem from "@/modules/User/components/UserListItem";
import {mapGetters} from "vuex";
export default {
  name: "Users",
  components: {UserListItem},
  props:{
    group: Object
  },
  methods:{
    ...mapGetters(['getGroup']),
  },
  computed:{
    getGroupFromStorage(){
      return this.getGroup()
    },
    getUser(){
      return {
        'userName': this.getGroupFromStorage.author,
        'userEmail':this.getGroupFromStorage.authorEmail,
        'userImage': this.getGroupFromStorage.authorImage,
        'date': this.getGroupFromStorage.date
      }
    }
  }
}
</script>

<style scoped>
.list{
  display: flex;
  flex-direction: column;
  gap:15px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}
</style>