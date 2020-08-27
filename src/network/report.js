import axios from '@/network/axios'

export default function() {
	return axios({
		url: 'reports/type/1',
	})
}
