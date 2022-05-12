export default {
    state: () => ({
        token: ''
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    }
}