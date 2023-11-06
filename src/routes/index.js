module.exports = [
	{
		'path': /(.*)/,
		'method': 'OPTIONS',
		'controller': 'DefaultAPI'
	},
	{
		'path': '',
		'method': 'GET',
		'controller': 'clients/ClientsList'
	},
	{
		'path': '',
		'method': 'POST',
		'controller': 'clients/CreateClient'
	},
	{
		'path': /\/(\d+)/,
		'method': 'GET',
		'controller': 'clients/ClientCard'
	},
	{
		'path': /\/(\d+)/,
		'method': 'PATCH',
		'controller': 'clients/UpdateClient'
	},
	{
		'path': /\/(\d+)/,
		'method': 'DELETE',
		'controller': 'clients/DeleteClient'
	}
];
