<template>
  <div class="avatar-upload">
    <div class="avatar-edit">
      <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="onFileChanged" />
      <label for="imageUpload"></label>
    </div>
    <div class="avatar-preview">
      <div id="imagePreview" :style="{ 'background-image': `url('${hostname+'/'+image}` }">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
export default {
  name: "ImageUploader",
  data(){
    return{
      selectedFile: null,
      image: '/images/uploads/user6274310597cb8_education-logo.png',
      hostname: config.hostname
    }
  },
  methods:{
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      formData.append('dirName', this.dirName)
      axios.post(this.hostname+'/api/upload', formData)
          .then((response) => {
            console.log(response.data)
            this.image = response.data.path
            this.$emit('uploaded', this.image)
          })
    },
  },
  props:{
    dirName: String
  }
}
</script>

<style scoped>
body {
  background: whitesmoke;
  font-family: 'Open Sans', sans-serif;
}

h1 {
  font-size: 20px;
  text-align: center;
  margin: 20px 0 20px;
}
h1 small {
  display: block;
  font-size: 15px;
  padding-top: 8px;
  color: gray;
}
.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 0px auto;
}
.avatar-upload .avatar-edit {
  position: absolute;
  right: 12px;
  z-index: 1;
  top: 10px;
}
.avatar-upload .avatar-edit input {
  display: none;
}
.avatar-upload .avatar-edit input + label {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 100%;
  background: #FFFFFF;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}
.avatar-upload .avatar-edit input + label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
}
.avatar-upload .avatar-edit input + label:after {
  content: url('https://cdn-icons-png.flaticon.com/16/61/61456.png');
  color: #757575;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}
.avatar-upload .avatar-preview {
  width: 132px;
  height: 132px;
  position: relative;
  margin-top: 20px;
  border-radius: 100%;
  border: 6px solid #F8F8F8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.avatar-upload .avatar-preview > div {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>