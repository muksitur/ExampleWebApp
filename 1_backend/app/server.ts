import { config } from './config';
import { version, commit, timestamp } from './version';
import bole from 'bole';

console.log(`example-backend v${version}, commit: ${commit} ${timestamp}`);
console.log('CORS config: ', config.express.cors);

import { app } from './app';

// Global logging setup.

(bole as any).output({
	level: 'info',
	stream: process.stdout
});
const log = bole('server');


log.info(`Starting server on port ${config.express.port}...`);
app.listen(config.express.port, ((e: any) => {
	if (e) {
		log.error('Unable to listen for connections', e);
		throw e;
	}
	log.info('Express is listening on http://' + config.express.ip + ':' + config.express.port);
}) as any);