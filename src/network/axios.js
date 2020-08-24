import Axios from 'axios'

export default function axios(option) {
	return new Promise((resolve, reject) => {
		const instance = Axios.create({
			baseURL: 'http://127.0.0.1:8888/api/private/v1/',
			timeout: 5000,
		})

		instance.interceptors.request.use(
			config => {
				config.headers.Authorization = sessionStorage.getItem('token')
				return config
			},
			err => {
				return err
			}
		)

		instance.interceptors.response.use(
			response => {
				return response.data
			},
			err => {
				return err
			}
		)

		instance(option)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}
