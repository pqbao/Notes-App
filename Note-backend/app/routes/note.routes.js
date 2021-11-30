const notes = require("../controllers/note.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", notes.create);
    router.get("/", notes.findAll);
    router.get("/:id", notes.findOne);
    router.put("/:id", notes.update);
    router.delete("/:id", notes.delete);
    router.delete("/", notes.deleteAll);
    app.use("/api/notes", router);
};