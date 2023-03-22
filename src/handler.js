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

function editNoteByIdHandler(request, h) {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Note updated successfully',
    });

    console.log(notes);
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update note. Id not found',
  });
  response.code(404);
  return response;
}

function deleteNoteByIdHandler(request, h) {
  const { id } = request.params;

  const noteIndex = notes.findIndex((note) => note.id === id);
  console.log(request.params);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    const response = h.response({
      status: 'success',
      message: 'Note successfully deleted',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to delete note. Id not found',
  });
  response.code(404);
  return response;
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
