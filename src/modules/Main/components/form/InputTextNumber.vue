<template>
  <div class="input">
    <input type="number" class="input-field" required
           :value='modelValue'
           :min="min"
           :max="max"
           @input='$emit("update:modelValue", $event.target.value)'
    />
    <label class="input-label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: "InputTextNumber",
  props: {
    modelValue: String,
    label: String,
    min: Number,
    max: Number
  },
}
</script>

<style scoped>
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
}
.input {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  padding-top: 1.5rem;
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.input-label {
  color: black;
  position: absolute;
  top: -0.1rem;
  left: 0.3rem;
  font-size: 18px;
}
.input-field {
  z-index: 0;
  background-color: #EBEDEE;
  border: none;
  border-radius: 10px;
  font: inherit;
  font-size: 1.125rem;
  padding: 0.5rem 0.7rem;
}
.input-field:focus{
  outline: none;
}
</style>