import axios from '@/network/axios'

export function ordersList_(params) {
	return axios({
		url: 'orders',
		params,
	})
}

export function ordersKuaidi_(id) {
	return axios({
		url: `kuaidi/${id}`,
	})
}
