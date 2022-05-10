import { createStore } from 'vuex'
import auth from "@/modules/User/store/auth";

const store = createStore({
    modules: {
        auth
    }
})
export default store;