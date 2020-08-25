import axios from '@/network/axios'

export function getRightsList(type) {
	return axios({
		url: `rights/${type}`,
	})
}

export function getRolesList() {
	return axios({
		url: 'roles',
	})
}

export function addRole_(data) {
	return axios({
		method: 'post',
		url: 'roles',
		data,
	})
}

export function editRole_(id, roleName, roleDesc) {
	return axios({
		method: 'put',
		url: `roles/${id}`,
		data: {
			roleName,
			roleDesc,
		},
	})
}

export function deleteRole_(id) {
	return axios({
		method: 'delete',
		url: `roles/${id}`,
	})
}

export function deleteRoleRight_(id, rightid) {
	return axios({
		method: 'delete',
		url: `roles/${id}/rights/${rightid}`,
	})
}

export function setRole_(id, rids) {
	return axios({
		method: 'post',
		url: `roles/${id}/rights`,
		data: {
			rids,
		},
	})
}
