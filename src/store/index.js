import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
	accountId: localStorage.getItem('accountId') || null,
	customerName: localStorage.getItem('customerName') || null
  },
  mutations: {
    login(state, data) {
		localStorage.setItem('token', data.token);
		localStorage.setItem('username', data.username);
		state.token = data.token;
		state.username = data.username;
    },
    logout(state) {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		state.username = null;
		state.token = null;
		
		localStorage.removeItem('accountId');
		localStorage.removeItem('customerName');
		state.accountId = null;
		state.customerName = null;
		
    },
	setCustomer(state, data){
		localStorage.setItem('accountId',data.accountId);
		localStorage.setItem('customerName',data.customerName);
		state.accountId = data.accountId;
		state.customerName = data.customerName;
	},
	removeCustomer(state){
		localStorage.removeItem('accountId');
		localStorage.removeItem('customerName');
		state.accountId = null;
		state.customerName = null;
	}
  },
  getters: {},
  actions: {}
})
