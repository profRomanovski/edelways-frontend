import axios from "axios";
import config from "@/config";

export default {
    state: {
        token: null,
        name: "",
        email: "",
        image: ""
    },
    getters: {
        getUserToken(state){
            return state.token
        },
        getUserName(state){
            return state.name
        },
        getUserEmail(sate){
            return sate.email
        },
        getUserImage(state){
            return state.image
        }
    },
    actions: {
        async createAccount(ctx, data){
            return await axios.post(config.hostname+'/api/create-account', data)
        },
        async login({commit, dispatch}, data){
            return await axios.post(config.hostname+'/api/login', data)
                .then((res)=>{
                    commit('setToken', res.data.token)
                    document.cookie = "Token="+res.data.token+";"
                    dispatch('loadUserData')
                })
        },
        async loadUserData({commit, rootGetters}){
            const token = rootGetters.getUserToken
            const configs = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.get(config.hostname+'/api/profile', configs)
                .then((res)=>{
                    commit('setUserName', res.data.name)
                    commit('setUserEmail', res.data.email)
                    commit('setUserImage', res.data.image)
                })
        }
    },
    mutations: {
        setToken(state, token){
            state.token = token
        },
        setUserName(state, name){
            state.name = name
        },
        setUserEmail(state, email){
            state.email = email
        },
        setUserImage(state, image){
            state.image = image
        }
    },
}