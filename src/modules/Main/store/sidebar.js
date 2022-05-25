export default {
    state: {
        isSidebarOpen: false
    },
    getters: {
        isSidebarOpen(state){
            return state.isSidebarOpen
        },
    },
    actions: {
        toggleSidebar(ctx){
            ctx.commit('setIsSidebarOpen')
        }
    },
    mutations: {
        setIsSidebarOpen(state){
            state.isSidebarOpen = !state.isSidebarOpen
        },
    },
}