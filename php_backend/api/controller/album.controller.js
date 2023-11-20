
const Message = require("../../constant/message");
const CODE = require("../../constant/status.code");

const Mongoose = require("mongoose");
const Album = Mongoose.model(process.env.ALBUM_MODEL);

const getAllAlbums = (req, res) => {
    let offset = 0;
    let size = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.size) {
        size = parseInt(req.query.size);
    }

    if (isNaN(offset) || isNaN(size)) {
        res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_OFFSET_SIZE });
    } else {
        Album.find({}, { songs: 0 }).sort( { year: -1, _id: -1 }).skip(offset * size).limit(size)
            .then((data) => {
                res.status(CODE.STATUS_OK).json({ data: data, size: size, offset: offset });
            })
            .catch((err) => {
                res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
            })
    }
}

const getAlbumById = (req, res) => {
    let id = req.params.albumId;
    Album.findById(id, { songs: 0 })
        .then((data) => {
            res.status(CODE.STATUS_OK).json({ data: data });
        })
        .catch((err) => {
            res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
        })
}

const deleteAlbum = (req, res) => {
    let id = req.params.albumId;
    Album.findByIdAndDelete(id)
        .then((_data) => {
            res.status(CODE.STATUS_OK).json({ message: Message.MSG_DELETE_SUCCESS });
        })
        .catch((err) => {
            res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
        })
}

const addAlbum = (req, res) => {
    let album = req.body;

    if (!album.title || !album.year) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_TITLE_YEAR })
    }

    if (isNaN(album.year)) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_YEAR });
    }

    Album.create(album)
        .then((_msg) => {
            res.status(CODE.STATUS_CREATED).json({ message: Message.MSG_ADD_SUCCESS });
        })
        .catch((err) => {
            res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
        })
}

const updateFullyAlbum = (req, res) => {
    let id = req.params.albumId;
    let album = req.body;

    if (!album.title || !album.year) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_TITLE_YEAR })
    }

    if (isNaN(album.year)) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_YEAR });
    }

    Album.findById(id)
        .then((data) => {
            data.title = album.title;
            data.year = album.year;
            data.image = album.image;
            data.songs = album.songs;
            return data.save()
        })
        .then((_data) => {
            res.status(CODE.STATUS_CREATED).json({ message: Message.MSG_UPDATE_SUCCESS_FULL });
        })
        .catch((err) => {
            res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
        })
}

const updatePartialyAlbum = (req, res) => {
    let id = req.params.albumId;
    let album = req.body;

    Album.findById(id)
        .then((data) => {
            if (album.title) {
                data.title = album.title;
            }
            data.image = album.image;
            if (album.year) {
                data.year = album.year;
            }
            if (album.songs) {
                data.songs = album.songs;
            }
            if (album.title) {
                data.title = album.title;
            }
            return data.save();
        })
        .then((_data) => {
            res.status(CODE.STATUS_CREATED).json({ message: Message.MSG_UPDATE_SUCCESS_PARTIAL });
        })
        .catch((err) => {
            res.status(CODE.STATUS_SERVER_ERROR).json({ message: err });
        })
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    addAlbum,
    deleteAlbum,
    updateFullyAlbum,
    updatePartialyAlbum
}