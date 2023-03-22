const { addNoteHandler } = require('./handler');

const routes = [
  {
    path: '/notes',
    method: 'GET',
    handler: () => 'it works',
  },
  {
    path: '/notes',
    method: 'POST',
    handler: addNoteHandler,
  },
];

module.exports = routes;
