<template>
  <div class="item" v-if="theory !== null">
    <icon name="theory" size="35px"></icon>
    <div class="labels">
      <span class="title">{{theory.name}}</span>
      <div class="labels-footer">
        <span>{{theory.author}}</span>
        <span>{{theory.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/modules/Framework/components/Icon";
export default {
  name: "TheoryHeader",
  components: {Icon},
  props:{
    theory: Object
  },
}
</script>

<style scoped>
.item{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 30px;
  box-sizing: border-box;
  background: #FFFFFF;
  gap: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.labels{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 3px;
  width: 100%;
}
.labels-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  font-size: 14px;
}
.title{
  font-weight: bold;
}
@media screen and (orientation: landscape ){
  .item{
    margin-left: 100px;
  }
}
</style>