module.exports = class DefaultAPIController
{
	constructor(requestParams) {
		this.requestParams = requestParams;
	}

	run(response) {
		response.setHeader('Content-Type', 'application/json');

		// CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		response.setHeader('Cache-Control', 'no-cache');
	}
}
