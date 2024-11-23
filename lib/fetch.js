const axios = require('axios');

const fetchApi = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
				'x-auth-type': 'apikey',
				'x-auth-value': 'API_KEY_VALUE'

			},
			...options
		})
		return res.mov

	} catch (err) {
		return err
	}
}
