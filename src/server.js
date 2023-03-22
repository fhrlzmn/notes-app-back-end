const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const PORT = 8080;
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

async function init() {
  const server = Hapi.server({
    port: PORT,
    host: HOST,

    // to allow same-origin policy to all routes
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();
