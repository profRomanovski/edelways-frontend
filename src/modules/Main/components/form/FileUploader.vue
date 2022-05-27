<template>
  <div class="file-uploader-container">
    <span>Файл: {{fileName}}</span>
    <input type='file' id="file-uploader" @change="onFileChanged" />
    <label for="file-uploader"  class="custom-file-upload">
      Вибрати
    </label>
  </div>

</template>

<script>
import config from "@/config";
import axios from "axios";

export default {
  name: "FileUploader",
  data(){
    return{
      file: null,
      fileName: "",
      hostname: config.hostname
    }
  },
  methods:{
    onFileChanged(event) {
      this.file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', this.file, this.file.name)
      formData.append('dirName', this.dirName)
      axios.post(this.hostname+'/api/upload-file', formData)
          .then((response) => {
            this.fileName = response.data.name
            this.$emit('uploaded', response.data.path)
            this.file = null
          })
          .catch(()=>{
            this.$toast.error('Сталася помилка під час завантажженя файла')
          })
    },
  },
  props:{
    dirName: String
  }
}
</script>

<style scoped>
.file-uploader-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
}
input[type="file"]{
  display: none;
}
.custom-file-upload{
  height: 40px;
  background-color: #43A691;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
span{
  font: inherit;
  font-size: 18px;
  color: black;

}
</style>