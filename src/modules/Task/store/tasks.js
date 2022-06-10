import axios from "axios";
import config from "@/config";

export default {
    state: {
        tasks : [],
        task: null,
        completes: [],
        complete: null
    },
    getters: {
        getTasks(state){
            return state.tasks
        },
        getTask(state){
            return state.task
        },
        getCompletes(state){
            return state.completes
        },
        getComplete(state){
            return state.complete
        }
    },
    actions: {
        async createTask({rootGetters, dispatch}, params){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            return await axios.post(config.hostname+'/api/create-task', params, configs)
                .then(()=>{
                    dispatch('loadTasks', params.group_id)
                })
        },
        async loadTasks({commit, rootGetters}, group_id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        group_id: group_id
                    }
                };
                await axios.get(config.hostname+'/api/tasks',configs)
                    .then((res)=>{
                        commit('setTasks', res.data)
                    })
            } else {
                commit('setTasks', [])
            }
        },
        async loadCompletes({commit, rootGetters}, task_id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        task_id: task_id
                    }
                };
                await axios.get(config.hostname+'/api/completes',configs)
                    .then((res)=>{
                        commit('setCompletes', res.data)
                    })
            } else {
                commit('setCompletes', [])
            }
        },
        async loadTask({commit, rootGetters}, id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        id: id
                    }
                };
                return await axios.get(config.hostname+'/api/task',configs)
                    .then((res)=>{
                        commit('setTask', res.data)
                    })
            } else {
                commit('setTask', null)
            }
        },
        async loadComplete({commit, rootGetters}, id){
            const token = rootGetters.getUserToken
            if(token){
                const configs = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        id: id
                    }
                };
                return await axios.get(config.hostname+'/api/complete',configs)
                    .then((res)=>{
                        commit('setComplete', res.data)
                    })
            } else {
                commit('setComplete', null)
            }
        },
        async completeTask({rootGetters, dispatch}, params){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            return await axios.post(config.hostname+'/api/complete-task', params, configs)
                .then(()=>{
                    dispatch('loadTask', params.task_id)
                })
        },
        async reviewTask({rootGetters, dispatch}, params){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            return await axios.post(config.hostname+'/api/review-task', params, configs)
                .then(()=>{
                    dispatch('loadComplete', params.complete_id)
                })
        },
        async deleteTask({rootGetters}, id){
            const token = rootGetters.getUserToken
            const configs = {
                headers: {Authorization: `Bearer ${token}`},
            }
            const data = {
                id: id
            }
            return await axios.post(config.hostname+'/api/delete-task', data, configs)
        },
    },
    mutations: {
        setTasks(state, tasks){
            state.tasks = tasks
        },
        setTask(state, task){
            state.task = task
        },
        setCompletes(state, completes){
            state.completes = completes
        },
        setComplete(state, complete){
            state.complete = complete
        }
    },
}