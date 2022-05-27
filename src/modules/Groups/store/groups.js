import axios from "axios";
import config from "@/config";

export default {
    state: {
        groups : [],
        filter: 'all',
        group: null
    },
    getters: {
        getGroups(state){
            return state.groups
        },
        getFilter(state){
            return state.filter
        },
        getGroup(state){
            return state.group
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
        },
        async loadGroup({commit, rootGetters}, id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        id: id
                    }
                };
                return await axios.get(config.hostname+'/api/group',configs)
                    .then((res)=>{
                        commit('setGroup', res.data)
                    })
            } else {
                commit('setGroup', null)
            }
        }
    },
    mutations: {
        setGroups(state, groups){
            state.groups = groups
        },
        setFilter(state, filter){
            state.filter = filter
        },
        setGroup(state, group){
            state.group = group
        }
    },
}