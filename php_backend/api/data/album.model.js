const Mongoose = require("mongoose");

const songSchema = Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
})

const albumSchema = Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1900,
        max: 2023,
        required: true
    },
    image: {
        type: String
    },
    songs: [songSchema]
});



Mongoose.model(process.env.ALBUM_MODEL, albumSchema, process.env.ALBUM_DOCUMENT);