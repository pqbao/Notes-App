module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: {
                type: String,
                require: [true, "Title name is require"],
            },
            content: String,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("note", schema);
};