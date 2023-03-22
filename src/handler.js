const { nanoid } = require('nanoid');
const notes = require('./notes');

function getAllNotesHandler() {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
}

function getNoteByIdHandler(request, h) {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (!note) {
    const response = h.response({
      status: 'fail',
      message: 'Note not found',
    });
    response.code(404);
    return response;
  }

  return { status: 'success', data: { note } };
}

function addNoteHandler(request, h) {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Notes Added Successfully',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    console.log(notes);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Cannot add notes',
  });
  response.code(500);
  return response;
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
