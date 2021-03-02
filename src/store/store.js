import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        language: "hun"
    },
    mutations: {
        increment(state) {
            state.count++
        },
        reset(state) {
            state.count = 0;
        },
        disappoint(state) {
            state.count = 9;
        }
    },
    getters: {

    }
})
export default store;