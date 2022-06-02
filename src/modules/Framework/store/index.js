import { createStore } from 'vuex'
import auth from "@/modules/User/store/auth";
import sidebar from "@/modules/Main/store/sidebar";
import groups from "@/modules/Groups/store/groups";
import theories from "@/modules/Theory/store/theories";
import tasks from "@/modules/Task/store/tasks";

const store = createStore({
    modules: {
        auth,
        sidebar,
        groups,
        theories,
        tasks
    }
})
export default store;