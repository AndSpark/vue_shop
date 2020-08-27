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

export function goodsList_(params) {
	return axios({
		url: 'goods',
		params,
	})
}

export function deleteGoods_(id) {
	return axios({
		method: 'delete',
		url: `goods/${id}`,
	})
}

export function addGood_(data) {
	return axios({
		method: 'post',
		url: 'goods',
		data: {
			goods_name: data.goods_name,
			goods_cat: data.goods_cat,
			goods_price: data.goods_price,
			goods_number: data.goods_number,
			goods_weight: data.goods_weight,
			goods_introduce: data.goods_introduce,
			pics: data.pics,
			attrs: data.attrs,
		},
	})
}
