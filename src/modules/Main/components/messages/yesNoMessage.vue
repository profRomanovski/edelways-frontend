<template>
  <modal-view :is-active="modalView" @toggleModal="toggleModal">
    <div class="message" >
      <span>{{text}}</span>
      <div class="buttons">
        <submit-button title="Так" @click="yesAction" class="btn"></submit-button>
        <submit-button title="Ні" @click="noAction" class="btn btn-no"></submit-button>
      </div>
    </div>
  </modal-view>
</template>

<script>
import ModalView from "@/modules/Main/components/modals/ModalView";
import SubmitButton from "@/modules/Main/components/buttons/SubmitButton";
export default {
  name: "yesNoMessage",
  components: {SubmitButton, ModalView},
  props: {
    modalView: {
      type: Boolean,
      default: false
    },
    text: String,
  },
  methods:{
    toggleModal(){
     this.$emit('toggleMessage')
    },
    yesAction(){
      this.$emit('yesAction')
    },
    noAction(){
      this.$emit('toggleMessage')
    }
  }
}
</script>

<style scoped>
.message{
  min-width: 300px;
  height: 180px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px
}
.buttons{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.btn{
  width: 100px;
  height: 40px;
}
.btn-no{
  background-color: #DC143C;
}
</style>