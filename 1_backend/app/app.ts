import express from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import connection, { config, PREFIX } from './config';
import { version } from './version';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import { swaggerDefinition, swaggerDocument } from './swagger';
// Routes
import todoRouter from './router/todo.router';


export let app = express();

// Let Express.js trust the proxy, and set req.hostname according to the "x-forwarded-host" header.
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
// Security by obscurity: We don't have to tell the world that we're using Express.
app.disable('x-powered-by');

// Allow cross-origin requests from an allow-list of origins.
const corsConfig: CorsOptions = config.express.cors;
corsConfig.origin = corsConfig.origin.map((origin) => {
	// Allow to conveniently specify "any origin" or "any port on localhost".
	// This could be extended to other hosts, but most probably it's not needed.
	if (origin === '*') {
		return true;
	} else if (origin === 'http://localhost:*') {
		return /^http:\/\/localhost(:\d+)?$/;
	} else {
		return origin;
	}
});
app.use(cors(corsConfig));


// Set custom headers
app.use((req, res, next) => {
	// Set no-cache for all backend responses.
	res.setHeader('Cache-Control', 'no-cache');

	// You need to expose this header to be able to read it with CORS
	res.setHeader('Access-Control-Expose-Headers', 'Server');
	// Set the api version to all backend responses.
	res.setHeader('Server', `example/${version} example-api-version/${swaggerDefinition.info.version}`);

	// Set Strict-Transport-Security to force HTTPS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security#examples
	// https://www.rfc-editor.org/rfc/rfc6797#section-7.2
	// "An HSTS Host MUST NOT include the STS header field in HTTP responses conveyed over non-secure transport."
	// Note that behind the load balancer, "req.secure" is set from the X-Forwarded-Proto header.
	if (req.secure) {
		res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
	}

	next();
});


// Used by session.router to pass the redirect URL in the logout route.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({
	// We allow e.g. 65k characters in Project.Description. The default 'limit' setting is too small for that.
	// The request body can be huge when creating multiple alignments (~378kb for 3471 photos)
	limit: '1024kb'
}));

app.use((
	err: Error,
	_req: express.Request,
	res: express.Response,
	_next: express.NextFunction
) => {
	res.status(500).send({ message: err.message });
});

connection.sync().then(() => {
	console.log('Database synced successfully');
}).catch((err) => {
	console.log('Error occurred', err);
});

app.use(PREFIX + '/todo', todoRouter);
app.use(PREFIX + '/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
	// Without this option, the HTML <title> is just "Swagger UI".
	customSiteTitle: swaggerDocument.info.title
}));
app.get(PREFIX + '/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerDocument);
});
app.get(PREFIX + '/swagger.yaml', function(req, res) {
	const swaggerSpecYaml = yaml.dump(swaggerDocument);
	res.setHeader('Content-Type', 'text/plain');
	res.send(swaggerSpecYaml);
});
