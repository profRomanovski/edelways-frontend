import { createStore } from 'vuex'
import auth from "@/modules/User/store/auth";
import sidebar from "@/modules/Main/store/sidebar";
import groups from "@/modules/Groups/store/groups";

const store = createStore({
    modules: {
        auth,
        sidebar,
        groups
    }
})
export default store;