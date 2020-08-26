import axios from '@/network/axios'

export function goodsCate_(params) {
	return axios({
		url: '/categories',
		params,
	})
}

export function addCate_(data) {
	return axios({
		method: 'post',
		url: '/categories',
		data,
	})
}
export function delCate_(id) {
	return axios({
		method: 'delete',
		url: `categories/${id}`,
	})
}

export function editCate_(id, cat_name) {
	return axios({
		method: 'put',
		url: `categories/${id}`,
		data: {
			cat_name,
		},
	})
}
