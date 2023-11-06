const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class FallbackController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		response.statusCode = 404;
		response.write(JSON.stringify({ 'message': 'Not Found' }));
	}
}
