const { BadRequestError, handle } = require("../helpers/errors");
const { Note } = require("../models");

exports.create = async (req, res, next) => {
    if (!req.body.title) {
        return next(new BadRequestError(400, "Title can not be empty"));
    }
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
    });
    const [error, document] = await handle(note.save());
    if (error) {
        return next(new BadRequestError(500, "An error occurred while creating a note"));
    }
    return res.send(document);
};
exports.findAll = async (req, res, next) => {
    const condition = {  };
    const title = req.query.title;
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }
    const [error, documents] = await handle(Note.find(condition));
    if (error) {
        return next(new BadRequestError(500, "An error occurred while retrieving the note"));
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };
    const [error, document] = await handle(Note.findOne(condition));
    if (error) {
        return next(new BadRequestError(500, `Error retrieving note with id=${req.params.id}`));
    }
    if (!document) {
        return next(new BadRequestError(404, "Note not found"));
    }
    return res.send(document);
};
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new BadRequestError(400, "Data to update can not be empty"));
    }
    const condition = {
        _id: req.params.id,
    };
    const [error, document] = await handle(
        Note.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );
    if (error) {
        return next(new BadRequestError(500, `Error updating note with id=${req.params.id}`));
    }
    if (!document) {
        return next(new BadRequestError(404, "Note not found"));
    }
    return res.send({ message: "Note was updated successfully", });
};
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };
    const [error, document] = await handle(
        Note.findOneAndDelete(condition)
    );
    if(error) {
        return next(new BadRequestError(500, `Could not delete note with id=${req.params.id}`));
    }
    if(!document) {
        return next(new BadRequestError(404, "Note not found"));
    }
    return res.send({ message: "Note was deleted successfully", });
};
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Note.deleteMany({ })
    );
    if(error) {
        return next(new BadRequestError(500, "An error occurred while removing all notes"));
    }
    return res.send({
        message: `${data.deleteCount} notes were deleted successfully`,
    });
};