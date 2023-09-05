/* eslint-disable no-console */
import axios from 'axios';
import cookie from 'js-cookie';

export const API_BASE_URL = `https://testing-admin-ecom-multi.24livehost.com/api`;
//const API_BASE_URL = `http://127.0.0.1:8000/api/v1`;
// http://192.168.4.188/In-house-e-commerce-multi-php/api/v1/vendor/stripe/create-payment-link

export const headerValue = async () => {
	const USER = cookie.get('userAuth');
	const AUTH_KEY = USER ? JSON.parse(USER)?.auth_key : '';
	const TOKEN = cookie.get('token');
	const GUEST_TOKEN = cookie.get('tokenguest');
	const CURRENCY = cookie.get('currencyValue');

	const header = {
		Accept: 'application/json',
		Authkey: AUTH_KEY,
		Authorization: `Bearer ${TOKEN ? TOKEN : GUEST_TOKEN}`,
		'Access-Token': 'DOTSQUARES123',
		"Content-Type" : 'application/json'
	};
	if (CURRENCY) {
		header.Currency = CURRENCY;
	}

	return header;
};

export const api = async options => {
	const header = await headerValue();
	try {
		const config = {
			url: `${API_BASE_URL}${options.url}`,
			method: options.method || 'GET',
			headers: header,
		};

		if (['POST', 'PUT'].includes(options.method)) {
			config['data'] = options.data;
		}

		if (options.headers) {
			config['headers'] = {
				...header,
				...options.headers,
			};
		}
		const response = await axios(config);
		if (response.data) return response.data;
		return response;
	} catch (error) {
		return error?.response?.data || 'Internal Server Error';
	}
};
