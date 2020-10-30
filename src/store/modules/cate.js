const CateGoodList={
    namespaced:true,
    state:{
        cateObj:{
        }
    },
    getters:{

    },
    mutations:{
        updataCateObj(state,payload){
            state.cateObj[payload.idx]=payload.arr
        }
    },
    actions:{
        
    }
}
export default CateGoodList