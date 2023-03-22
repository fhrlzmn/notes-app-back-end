const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    path: '/notes',
    method: 'GET',
    handler: getAllNotesHandler,
  },
  {
    path: '/notes',
    method: 'POST',
    handler: addNoteHandler,
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: getNoteByIdHandler,
  },
];

module.exports = routes;
