import { Sequelize } from 'sequelize-typescript';
import { Todos } from './model/todo.model';

const connection = new Sequelize({
	dialect: 'mysql',
	host: 'localhost',
	username: 'root',
	password: 'sonata',
	database: 'Test',
	logging: false,
	models: [Todos],
});

export default connection;
export const PREFIX = '/example/v1';

export const config = {
	express: {
		// https://faro01.atlassian.net/wiki/spaces/SW/pages/364806300/WebShare+VMs#WebShareVMs-Portnumbers
		port: 4800,
		// In AWS, we will manage network access using Security groups. -> Using 0.0.0.0 is fine.
		ip: '0.0.0.0',
		// Cross-origin API access config: https://expressjs.com/en/resources/middleware/cors.html
		// If a more complex config is needed later, regexes would also be allowed.
		// Since our API exclusively offers token-based and cookie-less authentication, we can allow all origins.
		cors: {
			origin: ['*'],
			// Let browser cache OPTIONS responses for 2 hours (or less, depending on browser implementation).
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
			maxAge: 7200
		}
	},
};
