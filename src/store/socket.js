export default {
    state: {
        expiredClients: [],
        frontVersion: '',
        backVersion: '',
    },
    getters: {
        expiredClients: (state) => state.expiredClients, 
        frontVersion: (state) => state.frontVersion, 
        backVersion: (state) => state.backVersion, 
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
            else if (message['type'] == 'msg' && message['versions'] != null) {
                state.frontVersion = message['versions']['front'];
                state.backVersion = message['versions']['back'];
            }
        }
    },
    actions: {
        expiredClientOnWork({ commit, dispatch }, {clientId, alertId}) {
            dispatch('saveClientInfo', {clientId: clientId, status: 'В работе'});
            commit('removeExpiredClient', alertId);
            
        },
        expiredClientOnCancel({commit, dispatch}, {alertId, clientId}) {
            commit('removeExpiredClient', alertId);
            
        }
    },
}