const address={
    namespaced:true,
    state:{
        brr:[]
    },
    getters:{

    },
    mutations:{
        updateBrr(state,payload){
            state.brr.push(payload)
        }
    },
    actions:{

    }
}
export default address