import { createStore } from 'vuex';

export default createStore({
    state(){
        return{
            numbersnumber: 120,
            numberstime : 60,
            binarynumber : 120,
            binarytime : 60,
            lettersnumber : 120,
            letterstime : 60,
        }
    },
    mutations: {
        changeValue (state, payload) {
          state.name.value = payload;
        }
     },
});