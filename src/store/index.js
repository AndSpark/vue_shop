import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		width: '200px',
		path: {
			path1: '',
			path2: '',
		},
	},
	mutations: {
		collapse(state, width) {
			state.width = width
		},
		currentPath(state, payload) {
			state.path.path1 = payload.path1
			state.path.path2 = payload.path2
		},
	},
	actions: {},
	modules: {},
})
