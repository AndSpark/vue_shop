export function formatDate(data, option = 'YYYY-MM-DD HH:mm:ss') {
	let config = {
		YYYY: data.getFullYear(),
		MM: data.getMonth() + 1,
		DD: data.getDate(),
		HH: data.getHours(),
		mm: data.getMinutes(),
		ss: data.getSeconds(),
	}

	for (const key in config) {
		if (config[key] < 10) config[key] = '0' + config[key]
		option = option.replace(key, config[key])
	}

	return option
}
