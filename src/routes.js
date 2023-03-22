const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
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
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: editNoteByIdHandler,
  },
];

module.exports = routes;
