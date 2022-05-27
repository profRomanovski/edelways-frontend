<template>
<div class="item" @click="theoryView">
<icon name="theory" size="45px"></icon>
  <div class="labels">
    <span>{{theory.name}}</span>
    <div class="labels-footer">
      <span>{{theory.date}}</span>
      <span>{{theory.author}}</span>
    </div>
  </div>
</div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
import router from "@/modules/Framework/router";
export default {
  name: "TheoryListItem",
  components: {Icon},
  props:{
    theory: Object,
  },
  methods:{
    theoryView(){
      router.push('/theory-view/'+this.theory.id)
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
</style>