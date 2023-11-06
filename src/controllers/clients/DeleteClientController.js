const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class DeleteClientController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		const clientID = this.requestParams[0];
		const clientModel = AppComponents.getComponent('clientModel');
		if (!clientModel.delete(clientID)) {
			response.statusCode = 404;
			response.write(JSON.stringify({ 'message': 'Not Found' }));
		}
	}
}
