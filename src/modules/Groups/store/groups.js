import axios from "axios";
import config from "@/config";

export default {
    state: {
        groups : [],
        filter: 'all'
    },
    getters: {
        getGroups(state){
            return state.groups
        },
        getFilter(state){
            return state.filter
        }
    },
    actions: {
        async createGroup({rootGetters, dispatch}, name){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                name: name
            }
            return await axios.post(config.hostname+'/api/create-group', data, configs)
                .then(()=>{
                    dispatch('loadGroups', 'my')
                })
        },
        async joinGroup({rootGetters, dispatch}, code){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                code: code
            }
            return await axios.post(config.hostname+'/api/join-group', data, configs)
                .then(()=>{
                    dispatch('loadGroups', 'all')
                })
        },
        async leftGroup({rootGetters, dispatch}, id){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                id: id
            }
            return await axios.post(config.hostname+'/api/left-group', data, configs)
                .then(()=>{
                    dispatch('loadGroups', 'all')
                })
        },
        async deleteGroup({rootGetters, dispatch}, id){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                id: id
            }
            return await axios.post(config.hostname+'/api/delete-group', data, configs)
                .then(()=>{
                    dispatch('loadGroups', 'my')
                })
        },
        async loadGroups({commit, rootGetters}, filter){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        filter: filter
                    }
                };
                await axios.get(config.hostname+'/api/groups',configs)
                    .then((res)=>{
                        console.log(res.data)
                        commit('setGroups', res.data)
                    })
            } else {
                commit('setGroups', [])
            }

        }
    },
    mutations: {
        setGroups(state, groups){
            state.groups = groups
        },
        setFilter(state, filter){
            state.filter = filter
        }
    },
}