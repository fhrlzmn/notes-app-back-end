const Hapi = require('@hapi/hapi');

const PORT = 8000;
const HOST = 'localhost';

async function init() {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();
