import axios from '@/network/axios'

export function menus() {
	return axios({
		url: '/menus',
	})
}

export function getUserList(params) {
	return axios({
		url: '/users',
		params,
	})
}
export function userState(uid, state) {
	return axios({
		method: 'put',
		url: `users/${uid}/state/${state}`,
	})
}

export function createUser(data) {
	return axios({
		method: 'post',
		url: '/users',
		data,
	})
}

export function editUser(id, email, mobile) {
	return axios({
		method: 'put',
		url: `users/${id}`,
		data: {
			email,
			mobile,
		},
	})
}

export function deleteUser(id) {
	return axios({
		method: 'delete',
		url: `users/${id}`,
	})
}
