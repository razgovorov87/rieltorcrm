export default {
    state: {
        expiredClients: [],
    },
    getters: {
        expiredClients: (state) => state.expiredClients, 
    },
    mutations: {
        removeExpiredClient(state, alertId) {
            const idx = state.expiredClients.findIndex(client => client.alertId == alertId);
            state.expiredClients.splice(idx, 1);
            
        },
        SOCKET_MESSAGE(state, message) {
            if (message['type'] == 'expiredClient') {
                state.expiredClients = message['msg'];
            }
        }
    },
    actions: {
        expiredClientOnWork({commit, dispatch}, alertId) {
            commit('removeExpiredClient', alertId);
            
        },
        expiredClientOnCancel({commit, dispatch}, {alertId, clientId}) {
            commit('removeExpiredClient', alertId);
            
        }
    },
}