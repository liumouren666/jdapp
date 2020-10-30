import { getGoodLists }from '@/utils/api.js'
const tabbarChange={
    namespaced:true,
    state:{
        nums:0
    },
    getters:{

    },
    mutations:{
        updataNums(state,payload){
            state.nums=payload.length
        }
    },
    actions:{
        getnew(store,params){
            getGoodLists(params).then(res=>{
                store.commit('updataNums',res)
            })
        }
    }
}

export default tabbarChange