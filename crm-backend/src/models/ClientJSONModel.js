const fs = require('fs');

module.exports = class ClientJSONModel {
	constructor(config) {
		this.config = AppComponents.getComponent('config');
		this.filePath = this.config.clientsJSONFilePath;
		if (!fs.existsSync(this.filePath)) {
			// Создадим пустой JSON-файл, если его еще нет
			this.writeData([]);
		}
	}

	// Метод возвращает общее кол-во клиентов в базе данных
	clientsCount() {
		return this.getClients().length;
	}

	// Метод возвращает объект-карточку клиента с указанным ID, или false, если такой клиент не найден
	getClient(clientID) {
		const client = this.getClients().filter((client) => client.id === clientID);
		return (client.length) ? client[0] : false;
	}

	// Метод создаёт нового клиента и заполняет его карточку данными из объекта clientCard. Возвращает ID нового клиента
	create(clientCard) {
		clientCard.id = Date.now().toString();
		clientCard.createdAt = clientCard.updatedAt = new Date().toISOString();
		const clients = [...this.getClients(), clientCard];
		this.writeData(clients);
		return clientCard.id;
	}

	// Метод пытается удалить клиента с указанным ID
	// Возвращает true, если клиент с таким ID существовал и был успешно удалён, false в противном случае
	delete(clientID) {
		const clients = this.getClients();
		const clientIndex = clients.findIndex((client) => client.id === clientID);
		if (clientIndex === -1) {
			return false;
		}
		clients.splice(clientIndex, 1);
		this.writeData(clients);
		return true;
	}

	// Метод пытается обновить данные клиента с указанным ID
	// Возвращает true, если клиент с таким ID существовует и его данные были обновлёны, false в противном случае
	update(clientID, clientCard) {
		const clients = this.getClients();
		const clientIndex = clients.findIndex((client) => client.id === clientID);
		if (clientIndex === -1) {
			return false;
		}
		Object.assign(clients[clientIndex], {...clients[clientIndex], ...clientCard});
		clients[clientIndex].updatedAt = new Date().toISOString();
		this.writeData(clients);
		return true;
	}

	// Метод возвращает список всех клиентов (массив объектов карточек клиентов)
	getClients() {
		return JSON.parse(fs.readFileSync(this.filePath) || '[]');
	}

	// Метод производит правильность заполнения объекта карточки клиента, и возвращает объект карточки только с нужными полями
	// Если какие-то поля заполнены неверно или не заполнены, в массиве errors будут сообщения об ошибках
	validateCard(clientCard, errors) {

		function asString(v) {
			return v && String(v).trim() || '';
		}

		const client = {
			name: asString(clientCard.name),
			surname: asString(clientCard.surname),
			lastName: asString(clientCard.lastName),
			contacts: Array.isArray(clientCard.contacts) ? clientCard.contacts.map(contact => ({
				type: asString(contact.type),
				value: asString(contact.value),
			})) : [],
		}

		// Очищаем массив с сообщениями об ошибках
		errors.splice(0, errors.length);

		// Проверяем, все ли данные корректные и заполняем массив с объектами ошибок, которые нужно отдать http-клиенту
		if (!client.name) {
			errors.push({ 'field': 'name', 'message': 'Не указано имя' });
		}
		if (!client.surname) {
			errors.push({ 'field': 'surname', 'message': 'Не указана фамилия' });
		}
		if (client.contacts.some(contact => !contact.type || !contact.value)) {
			errors.push({ 'field': 'contacts', 'message': 'Не все добавленные контакты полностью заполнены' });
		}

		return client;
	}

	// Метод сохраняет переданный массив объектов карточек клиентов в файл
	writeData(clients) {
		fs.writeFileSync(this.filePath, JSON.stringify(clients), { encoding: 'utf8' });
	}
}