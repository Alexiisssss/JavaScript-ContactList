// Абсолютный путь каталога /src приложения
global.APP_ROOT = process.main ? process.main.paths[0].split('node_modules')[0] : process.mainModule.paths[0].split('node_modules')[0];

// Менеджер компонентов приложения
global.AppComponents = require(APP_ROOT + 'utils/appComponents.js');

// Маршруты
AppComponents.registerComponent(
	'routes',
	APP_ROOT + '/routes'
);
// Конфигурация приложения
AppComponents.registerComponent(
	'config',
	APP_ROOT + 'config'
);
// Маршрутизатор
AppComponents.registerComponent(
	'router',
	APP_ROOT + 'utils/router.js'
);
// Модель клиента, использующая для хранения данных JSON-файл
AppComponents.registerComponent(
	'clientModel',
	APP_ROOT + 'models/ClientJSONModel.js'
);
// Баннер
AppComponents.registerComponent(
	'banner',
	APP_ROOT + 'utils/banner.js'
);
// Создаём приложение как экземпляр класса App
// За обработку всех URI, для которых не найден подходящий маршрут, будет отвечать контроллер FallbackController
AppComponents.registerComponent(
	'app',
	APP_ROOT + 'app',
	'Fallback'
);

const app = AppComponents.getComponent('app');
app.start();
