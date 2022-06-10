<template>
  <div class="content">
    <form-general
        path="images/join-group.jpg"
        submitTitle="Копіювати в буфер"
        @submitForm="copyAction"
    >
      <input-text-read-only v-model="getCode" input-type="text" label="Код"></input-text-read-only>
    </form-general>
  </div>
</template>

<script>
import FormGeneral from "@/modules/Main/components/form/FormGeneral";
import InputTextReadOnly from "@/modules/Main/components/form/InputTextReadOnly";
import {mapGetters} from "vuex";
import { toClipboard } from '@soerenmartius/vue3-clipboard'

export default {
  name: "InviteView",
  components: {InputTextReadOnly, FormGeneral},
  methods:{
    ...mapGetters(['getGroup']),
    copyAction(){
      toClipboard(this.getCode)
      // router.back()
       this.$toast.info('Код скопійовано в буфер обміну')
    }
  },
  computed:{
    getCode(){
      return this.getGroup().code
    }
  },
}
</script>

<style scoped>

</style>