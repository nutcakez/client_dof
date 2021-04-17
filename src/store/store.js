import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        language: "hun"
    },
    mutations: {
        changeLanguage(state,lang) {
            state.language=lang
        }
    },
    getters: {

    }
})
export default store;