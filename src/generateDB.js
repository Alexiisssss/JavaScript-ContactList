// Абсолютный путь каталога /src приложения
global.APP_ROOT = process.main ? process.main.paths[0].split('node_modules')[0] : process.mainModule.paths[0].split('node_modules')[0];

// Менеджер компонентов приложения
global.AppComponents = require(APP_ROOT + 'utils/appComponents.js');

// Конфигурация приложения
AppComponents.registerComponent(
	'config',
	APP_ROOT + 'config'
);
// Модель клиента, использующая для хранения данных JSON-файл
AppComponents.registerComponent(
	'clientModel',
	APP_ROOT + 'models/ClientJSONModel.js'
);

const app = {
	'names': [
		[
			'Анастасия',
			'Вероника',
			'Галина',
			'Дарья',
			'Екатерина',
			'Жанна',
			'Зоя',
			'Ирина',
			'Ксения',
			'Лариса',
			'Марина',
			'Наталья',
			'Оксана',
			'Полина',
			'Раиса',
			'Светлана',
			'Татьяна',
			'Ульяна',
			'Юлия',
			'Яна'
		],
		[
			'Александр',
			'Борис',
			'Василий',
			'Галактион',
			'Даниил',
			'Евгений',
			'Иван',
			'Лев',
			'Матвей',
			'Николай',
			'Олег',
			'Павел',
			'Руслан',
			'Сергей',
			'Тарас',
			'Фёдор'
		]
	],
	'patronymics': [
		[
			'Александровна',
			'Борисовна',
			'Васильевна',
			'Галактионовна',
			'Данииловна',
			'Евгеньевна',
			'Ивановна',
			'Львовна',
			'Матвеевна',
			'Николаевна',
			'Олеговна',
			'Павловна',
		],
		[
			'Матвеевич',
			'Николаевич',
			'Олегович',
			'Павлович',
			'Русланович',
			'Сергееевич',
			'Тарасович',
			'Фёдорович',
			'Галактионович',
		]
	],
	'lastNames': [
		[
			'Иванова',
			'Петрова',
			'Сидорова',
			'Гаврилова',
			'Игнатова',
			'Пастухова',
			'Протопопова',
			'Тарасова',
			'Белкина',
		],
		[
			'Иванов',
			'Петров',
			'Протопопов',
			'Гаврилов',
			'Белкин',
			'Щекочихин-Крестовоздвиженский',
			'Ефимов',
			'Никифоров',
			'Пушкин',
			'Тарасов',
			'Ульянов',
		]
	],

	start() {
		this.config = AppComponents.getComponent('config');
		this.banner = '';
		const fs = require('fs');
		if (fs.existsSync(APP_ROOT + 'banner.txt')) {
			this.banner = fs.readFileSync(APP_ROOT + 'banner.txt', { encoding: 'utf8' });
		}
		console.log(`${this.banner}
Генерация случайной базы клиентов...
`);
		return this;
	},

	async generateClientsDB() {
		const clientsCount = this.getRandomInt(this.config.randomClientsMaxCount - this.config.randomClientsMinCount - 1) + 1 + Number(this.config.randomClientsMinCount);
		const clientModel = AppComponents.getComponent('clientModel');
		console.log(`Генерируем случайных клиентов: ${clientsCount}`);
		// Очищаем JSON-файл
		clientModel.clearDB();
		for (let i = 1; i <= clientsCount; i++) {
			const gender = this.getRandomInt(1);
			const newClient = {
				'name': this.names[gender][this.getRandomInt(this.names[gender].length - 1)],
				'lastName': this.patronymics[gender][this.getRandomInt(this.patronymics[gender].length - 1)],
				'surname': this.lastNames[gender][this.getRandomInt(this.lastNames[gender].length - 1)],
				'contacts': []
			}
			console.log(`${newClient.name} ${newClient.lastName} ${newClient.surname}`);
			clientModel.create(newClient);
			await this.delay();
		}
	},

	getRandomInt(maxValue) {
		return Math.floor(Math.random() * (maxValue + 1));
	},

	async delay() {
		return new Promise(resolve => setTimeout(resolve, 20)); // 20 мс
	}
}

app.start().generateClientsDB();
