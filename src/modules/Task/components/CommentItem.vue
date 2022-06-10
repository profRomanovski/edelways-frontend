<template>
  <div class="item" v-if="comment">
    <img :src="getImagePath()" alt="logo" width="52" height="55">
    <div class="labels">
      <span>{{comment.data.author}}</span>
      <template v-if="comment.type === 'complete'">
        <span>Завантажив файл <a class="underline" :href="getDocumentPath" target="_blank">{{comment.data.document}}</a> </span>
      </template>
      <template v-else>
        <span>Поставив оцінку {{comment.data.mark}} та додав коментар: <br> {{comment.data.comment}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import config from "@/config";

export default {
  name: "CommentItem",
  props:{
    comment: Object
  },
  methods:{
    getImagePath(){
      let hostname = config.hostname;
      return  hostname+this.comment.data.image
    },
  },
  data() {
    return {
      hostname: config.hostname,
    }
  },
  computed:{
    getDocumentPath() {
      return "https://docs.google.com/viewerng/viewer?url=" + this.hostname + this.comment.data.document_path
    },
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

img{
  border-radius: 50%;
  object-fit: cover;
}
a{
  text-decoration: none;
  color: #2777b4;
}

.underline{
  position: relative;
}

.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #0074D9;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>