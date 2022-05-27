import axios from "axios";
import config from "@/config";
import router from "@/modules/Framework/router";

export default {
    state: {
        theories : [],
        theory: null
    },
    getters: {
        getTheories(state){
            return state.theories
        },
        getTheory(state){
            return state.theory
        }
    },
    actions: {
        async createTheory({rootGetters, dispatch}, params){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            return await axios.post(config.hostname+'/api/create-theory', params, configs)
                .then(()=>{
                    dispatch('loadTheories', params.group_id)
                })
        },
        async loadTheories({commit, rootGetters}, group_id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        group_id: group_id
                    }
                };
                await axios.get(config.hostname+'/api/theories',configs)
                    .then((res)=>{
                        commit('setTheories', res.data)
                    })
            } else {
                commit('setTheories', [])
            }
        },
        async loadTheory({commit, rootGetters}, id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        id: id
                    }
                };
                return await axios.get(config.hostname+'/api/theory',configs)
                    .then((res)=>{
                        commit('setTheory', res.data)
                    })
            } else {
                commit('setTheory', null)
            }
        },
        async deleteTheory({rootGetters}, id){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                id: id
            }
            return await axios.post(config.hostname+'/api/delete-theory', data, configs)
                .then(()=>{
                    router.back()
                })
        },
    },
    mutations: {
        setTheories(state, theories){
            state.theories = theories
        },
        setTheory(state, theory){
            state.theory = theory
        }
    },
}