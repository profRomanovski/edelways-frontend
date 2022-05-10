import { createApp } from 'vue'
import store from '@/modules/Framework/store'
import App from './App.vue'
import router from '@/modules/Framework/router'
import icon from "@/modules/Framework/components/Icon";
import axios from 'axios'
import Toaster from '@meforma/vue-toaster';
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Toaster, {
    position: 'top'
})
app.use(VueAxios, axios)
app.component('icon', icon)
app.mount('#app')