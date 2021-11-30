const mongoose = require("mongoose");
const createNoteModel = require("./note.model");

const db = {};
db.mongoose = mongoose;
db.Note = createNoteModel(mongoose);

module.exports = db;