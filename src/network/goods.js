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

export function goodsCateAttr_(id, sel) {
	return axios({
		url: `categories/${id}/attributes`,
		params: {
			sel,
		},
	})
}
export function addAttr_(params) {
	return axios({
		method: 'post',
		url: `categories/${params.id}/attributes`,
		data: {
			attr_name: params.attr_name,
			attr_sel: params.attr_sel,
			attr_vals: params.attr_vals,
		},
	})
}

export function editAttr_(params) {
	return axios({
		method: 'put',
		url: `categories/${params.cat_id}/attributes/${params.attr_id}`,
		data: {
			attr_name: params.attr_name,
			attr_sel: params.attr_sel,
			attr_vals: params.attr_vals,
		},
	})
}

export function delelteAttr_(id) {
	return axios({
		method: 'delete',
		url: `categories/${id.cat_id}/attributes/${id.attr_id}`,
	})
}
