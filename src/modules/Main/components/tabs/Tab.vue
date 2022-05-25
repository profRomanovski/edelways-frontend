<template>
  <input type="radio" class="stv-radio-tab" name="radioTabTest" :id="value"
         @input='$emit("update:modelValue", $event.target.id)'
         :checked="checked"
  />
  <label :for="value">{{this.label}}</label>
</template>

<script>
export default {
  name: "Tab",
  props:{
    value: String,
    label: String,
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
input.stv-radio-tab {
  position: absolute;
  left: -99999em;
  top: -99999em;
}
input.stv-radio-tab + label {
  cursor: pointer;
  float: left;
  border-bottom: 0;
  background-color: #fff;
  margin-right: -1px;
  padding: 0.5em 1em;
  position: relative;
}
input.stv-radio-tab + label:hover {
  background-color: #eee;
}
input.stv-radio-tab:checked + label {
  box-shadow: 0 5px 0 -1px #2794B5, inset 0 5px 0 -1px #fff;
  background-color: #fff;
  border-color: #428bca;
  z-index: 1;
}
</style>