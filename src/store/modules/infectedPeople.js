export default {
    //識別するために必要
    namespaced: true,
    state: {
        count: 1
    },
    mutation: {
        update(state) {
            state.count += 100
        }
    },
    actions: {
        addcount({ commit }){
            commit('update')
        }
    },
    getters: {
        getcount() {
            return 8;
        },
    }
}