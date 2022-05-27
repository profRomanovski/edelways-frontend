<template>
<div class="list">
  <template v-for="theory in getTheoriesFromStorage" :key="theory.id">
    <theory-list-item :theory="theory" iconSize="45px"></theory-list-item>
  </template>
</div>
</template>

<script>
import TheoryListItem from "@/modules/Theory/components/TheoryListItem";
import {mapActions, mapGetters} from "vuex";
import getErrorText from "@/modules/Framework/services/ErrorService";
export default {
  name: "TheoryList",
  components: {TheoryListItem},
  methods:{
    ...mapActions(['loadTheories']),
    ...mapGetters(['getTheories'])
  },
  props:{
    groupId: Number
  },
  computed:{
    getTheoriesFromStorage(){
      return this.getTheories()
    }
  },
  mounted() {
    this.loadTheories(this.groupId)
        .catch((res)=>{
          this.$toast.error(getErrorText(res.response))
        })
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