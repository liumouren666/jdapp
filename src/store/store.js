import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import HomeGoodList from './modules/home.js';
import CateGoodList from './modules/cate.js';
import tabbarChange from './modules/tabbar.js';
import address from './modules/address.js';

const store=new Vuex.Store({
    state:{
        list:[],
    },
    getters:{

    },
    mutations:{
        
    },
    actions:{
        
    },
    modules:{
        HomeGoodList,
        CateGoodList,
        tabbarChange,
        address

    }
})
export default store;