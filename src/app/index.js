module.exports = class App {
	constructor(fallbackControllerClass) {
		this.fallbackControllerClass = fallbackControllerClass;
		this.config = AppComponents.getComponent('config');
		this.router = AppComponents.getComponent('router');
		this.banner = AppComponents.getComponent('banner');
		this.requestBodyObj = null;
	}

	// Создание объекта http.Server и его запуск
	start() {
		this.httpServer = require('http').createServer(this.listener.bind(this));
		this.httpServer
			.on('listening', () => console.log(`${this.banner}`))
			.listen(this.config.port);
	}

	// Основная функция приложения - callback для http.Server.requestListener
	async listener(request, response) {
		const controllerClassName = (this.router.handle(request) || this.fallbackControllerClass) + 'Controller';
		let reqBody = '';
		request.on('data', (chunk) => {
			reqBody += chunk
		});
		request.on('end', () => {
			try {
				this.requestBodyObj = JSON.parse(reqBody);
			}
			catch (err) {
				this.requestBodyObj = {};
			}
			this.runController(controllerClassName, response);
			response.end();
			if (this.config.showResponsesInTerminal) {
				const now = new Date();
				console.log(`${now.toISOString()} ${request.method} ${request.url} - ${response.statusCode} (${response.statusMessage}) [${controllerClassName}]`);
			}
		});
		return;
	}

	// Создать экземляр указанного класса контроллера и запустить его.
	// Если контроллер создать не удалось, вернуть ошибку 500
	runController(className, response) {
		try {
			const controller = AppComponents.getObject(APP_ROOT + 'controllers/' + className + '.js', this.router.requestParams);
			controller.run(response);
		}
		catch (err) {
			response.statusCode = 500;
			response.write(JSON.stringify({ 'message': 'Server Error' }));
			console.error(err);
		}
	}
}
