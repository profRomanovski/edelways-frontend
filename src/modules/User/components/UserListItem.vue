<template>
  <div class="item">
    <img :src="getImagePath()" alt="logo" width="52" height="55">
    <div class="labels">
      <div class="labels-footer">
        <span>{{user.userName}}</span>
        <span v-if="role === 'admin'">Адміністратор</span>
        <icon v-if="role !== 'admin' && getGroupFromStorage.isAdmin"
        name="delete-group" size="25px"
        @click="deleteUserAction"
        >
        </icon>
      </div>
      <div class="labels-footer">
        <span>{{user.userEmail}}</span>
        <span>{{user.date}}</span>
      </div>
    </div>
  </div>
  <yes-no-message :modal-view="showMessage"
                  @toggleMessage="toggleMessage"
                  @yesAction="yesAction"
                  :text="text">

  </yes-no-message>
</template>

<script>
import config from "@/config";
import {mapActions, mapGetters} from "vuex";
import Icon from "@/modules/Framework/components/Icon";
import YesNoMessage from "@/modules/Main/components/messages/yesNoMessage";
import getErrorText from "@/modules/Framework/services/ErrorService";

export default {
  name: "UserListItem",
  components: {YesNoMessage, Icon},
  props: {
    user: Object,
    role: {
      type: String,
      default: 'user'
    },
  },
  data(){
    return{
      showMessage: false,
      text: ""
    }
  },
  methods: {
    ...mapGetters(['getGroup']),
    ...mapActions(['deleteUserFromGroup']),
    getImagePath(){
      let hostname = config.hostname;
      return  hostname+this.user.userImage
    },
    deleteUserAction(){
      this.showMessage = true;
      this.text = 'Ви впевнені що хочете видалити '+this.user.userName+'?'
    },
    yesAction(){
      this.showMessage=false;
      const data = {
        group_id : this.getGroupFromStorage.id,
        user_id: this.user.user_id
      }
      this.deleteUserFromGroup(data)
          .then(()=>{
            this.$toast.success('Користувача видалено з групи')
          })
          .catch((res)=>{
            this.$toast.error(getErrorText(res.response))
          })
    },
    toggleMessage(){
      this.showMessage = !this.showMessage
    }
  },
  computed:{
    getGroupFromStorage(){
      return this.getGroup()
    }
  }
}
</script>

<style scoped>
.item{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 60px;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #ECEDEF;
  border-radius: 10px;
  gap: 15px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}
.labels{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 10px;
  width: 100%;
}
.labels-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
img{
  border-radius: 50%;
}
</style>