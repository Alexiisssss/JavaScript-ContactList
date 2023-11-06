module.exports = class AppComponents
{
	static components = [];

	static registerComponent(name, componentFilename, ...args) {
		if (AppComponents.components[name]) {
			return false;
		}
		try {
			AppComponents.components[name] = AppComponents.getObject(componentFilename, ...args);
		}
		catch (err) {
			console.error(`Не удалось подключить файл компонента "${fileName}":
${err.message}
`);
			process.exit(err.code);
		}
		return true;
	}

	static getComponent(name) {
		return AppComponents.components[name];
	}

	static getObject(fileName, ...args) {
		const Obj = require(fileName);
		if (typeof Obj === 'function') {
			// Это класс - создадим и вернём его экземпляр
			return new Obj(...args);
		}
		return Obj;
	}
}
