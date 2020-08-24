import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		width: '200px',
	},
	mutations: {
		collapse(state, width) {
			state.width = width
		},
	},
	actions: {},
	modules: {},
})
