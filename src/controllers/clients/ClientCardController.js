const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class ClientCardController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		const clientID = this.requestParams[0];
		const clientCard = AppComponents.getComponent('clientModel').getClient(clientID);
		if (clientCard) {
			response.write(JSON.stringify(clientCard));
		}
		else {
			response.statusCode = 404;
			response.write(JSON.stringify({ 'message': 'Not Found' }));
		}
	}
}
