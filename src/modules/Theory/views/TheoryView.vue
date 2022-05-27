<template>
  <template v-if="getTheoryFromStorage !== null">
    <header-clild>
      <theory-header :theory="getTheoryFromStorage"></theory-header>
      <template v-if="getTheoryFromStorage.isAdmin">
        <icon name="delete-group" class="icon" @click="deleteTheoryAction" size="20px"></icon>
      </template>
    </header-clild>
    <template v-if="getTheoryFromStorage">
      <iframe class="view"
              :src="getDocumentPath"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </template>
    <template v-if="showMessage">
      <yes-no-message :modal-view="showMessage" @toggleMessage="toggleMessage" :text="text"
                      @yesAction="yesAction">
      </yes-no-message>
    </template>
  </template>
</template>

<script>
import getErrorText from "@/modules/Framework/services/ErrorService";
import router from "@/modules/Framework/router";
import {mapActions, mapGetters} from "vuex";
import HeaderClild from "@/modules/Main/components/header/HeaderClild";
import TheoryHeader from "@/modules/Theory/components/header/TheoryHeader";
import config from "@/config";
import Icon from "@/modules/Framework/components/Icon";
import YesNoMessage from "@/modules/Main/components/messages/yesNoMessage";

export default {
  name: "TheoryView",
  components: {YesNoMessage, Icon, TheoryHeader, HeaderClild},
  data() {
    return {
      theoryId: this.$route.params.id,
      hostname: config.hostname,
      showMessage: false,
      text: ""
    }
  },
  methods: {
    ...mapActions(['loadTheory', 'deleteTheory']),
    ...mapGetters(['getTheory']),
    toggleMessage() {
      this.showMessage = !this.showMessage
    },
    deleteTheoryAction() {
      this.showMessage = true;
      this.text = "Ви дійсно хочете видалити " + this.getTheoryFromStorage.name + "?"
    },
    yesAction() {
      this.deleteTheory(this.theoryId)
          .catch((res)=>{
            this.$toast.error(getErrorText(res.response))
          })
      this.toggleMessage()
    }
  },
  computed: {
    getTheoryFromStorage() {
      return this.getTheory()
    },
    getDocumentPath() {
      return "https://docs.google.com/gview?url=" + this.hostname + this.getTheoryFromStorage.document_path + "&embedded=true"
    },
  },
  async mounted() {
    await this.loadTheory(this.theoryId)
        .catch((res) => {
          this.$toast.error(getErrorText(res.response))
          router.push('/')
        })
  }
}
</script>

<style scoped>
.view {
  width: 100%;
  height: 1000px;
  margin-top: 3px;
  background-color: #D1D1D1;
}

.icon {
  cursor: pointer;
}
</style>