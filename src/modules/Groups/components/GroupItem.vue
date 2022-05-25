<template>
<div class="item">
  <h1>{{ group.name }}</h1>
  <hr>
  <h2>{{ group.author }}</h2>
  <div class="people">
    <icon name="group" size="40px"></icon>
    <span>{{group.users}}</span>
  </div>
  <template v-if="getFilterFromStorage === 'all'">
    <icon name="left-group" class="group-action-icon" @click="leftGroupAction" size="20px"></icon>
  </template>
  <template v-else>
    <icon name="delete-group" class="group-action-icon" @click="deleteGroupAction" size="20px"></icon>
  </template>
  <div class="button-container">
    <submit-button title="перегляд"></submit-button>
  </div>
</div>
  <template v-if="showMessage">
    <yes-no-message :modal-view="showMessage" @toggleMessage="toggleMessage" :text="text"
    @yesAction="yesAction">
    </yes-no-message>
  </template>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
import {mapActions, mapGetters} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
import YesNoMessage from "@/modules/Main/components/messages/yesNoMessage";
export default {
  name: "GroupItem",
  components: {YesNoMessage, SubmitButton, Icon},
  props:{
    group: Object,
  },
  data(){
    return{
      showMessage: false,
      text: ""
    }
  },
  methods:{
    ...mapGetters(['getFilter']),
    ...mapActions(['deleteGroup', 'leftGroup']),
    leftGroupAction(){
      this.showMessage = true;
      this.text = "Ви дійсно хочете вийти з групи "+this.group.name+"?"
    },
    deleteGroupAction(){
      this.showMessage = true;
      this.text = "Ви дійсно хочете видалити групу "+this.group.name+"?"
    },
    toggleMessage(){
      this.showMessage = !this.showMessage
    },
    yesAction(){
      if (this.getFilterFromStorage === 'my') {
        this.deleteGroup(this.group.id)
            .then(()=>{
              this.$toast.info('Ви видалили групу '+this.group.name)
            })
            .catch((res)=>{
              this.$toast.error(getErrorText(res.response))
            })
      } else {
        this.leftGroup(this.group.id)
            .then(()=>{
              this.$toast.info('Ви вийшли з групи '+this.group.name)
            })
            .catch((res)=>{
              this.$toast.error(getErrorText(res.response))
            })
      }
      this.toggleMessage()
    }
  },
  computed:{
    getFilterFromStorage(){
      return this.getFilter()
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  align-items: center;
  min-width: 220px;
  min-height: 220px;
  border: 1px solid #C1C1C1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.people{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  width: 100%;
}
.button-container{
  height: 30px;
  width: 90%;
  margin-top: 10px;
}
span{
  margin-left: 10px;
}
h1{
  font-size: 24px;
}
hr {
  display: block;
  height: 2px;
  border: 0;
  border-top: 2px solid #0000003F;
  margin: 1em 0;
  padding: 0;
  width: 90%;
}
.group-action-icon{
  cursor: pointer;
}
</style>