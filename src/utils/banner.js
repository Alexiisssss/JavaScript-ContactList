module.exports = class Banner
{
	constructor() {
		this.config = AppComponents.getComponent('config');
		this.banner = '';
		const fs = require('fs');
		if (fs.existsSync(APP_ROOT + 'banner.txt')) {
			this.banner = fs.readFileSync(APP_ROOT + 'banner.txt', { encoding: 'utf8' });
		}
	}

	toString() {
		return `${this.banner}
Сервер CRM запущен. Вы можете обращаться к нему по адресу http://localhost:${this.config.port}.
Нажмите CTRL+C, чтобы остановить сервер.
Доступные методы:
GET ${this.config.apiURIPrefix}
POST ${this.config.apiURIPrefix} - создать клиента, в теле запроса нужно передать объект { name: string, surname: string, lastName?: string, contacts?: object[] }
	contacts - массив объектов контактов вида { type: string, value: string }
GET ${this.config.apiURIPrefix}/{id} - получить клиента по его ID
PATCH ${this.config.apiURIPrefix}/{id} - изменить клиента с ID, в теле запроса нужно передать объект { name?: string, surname?: string, lastName?: string, contacts?: object[] }
	contacts - массив объектов контактов вида { type: string, value: string }
DELETE ${this.config.apiURIPrefix}/{id} - удалить клиента по ID
`;
	}
}
