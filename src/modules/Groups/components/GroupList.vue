<template>
  <template v-if="getGroupsCount > 0">
    <template v-for="group in getGroupsFromStorage" :key="group.id" class="group-list">
      <group-item :group="group"></group-item>
    </template>
  </template>
   <template v-else>
     <div class="not-found">
       <img class="image" src="@/assets/images/found-group.png" alt="find-group">
       <span>{{label}}</span>
       <div class="submit-button">
         <submit-button :title="actionLabel" @click="clickGroupAction"></submit-button>
       </div>
     </div>
   </template>
</template>

<script>
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
import {mapActions, mapGetters} from "vuex";
import GroupItem from "@/modules/Groups/components/GroupItem";
export default {
  name: "GroupList",
  components: {GroupItem, SubmitButton},
  props:{
    filter:{
      type: String,
      default: "all"
    },
    label: String,
    actionLabel: String
  },
  methods:{
    ...mapActions(['loadGroups']),
    ...mapGetters(['getGroups']),
    clickGroupAction(){
      if(this.filter === 'my'){
        this.$emit('createGroupAction')
        console.log('a;;')
      } else {
        this.$emit('joinGroupAction')
      }
    }
  },
 computed:{
    getGroupsFromStorage(){
      return this.getGroups()
    },
   getGroupsCount(){
      return this.getGroups().length
   }
 },
  // beforeUpdate() {
  //   this.loadGroups('my')
  // },
  mounted() {
    this.loadGroups(this.filter)
  }
}
</script>

<style scoped>
span{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
}
.submit-button{
  min-width: 200px;
  height: 50px;
}
.not-found{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 15px;
  width: 100%;
  object-fit: fill;
}
@media screen and (orientation: portrait ){
  .image{
    max-width: 350px;
  }
}
</style>