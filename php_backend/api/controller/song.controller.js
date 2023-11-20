const callback = require("./callback.utils");

const Mongoose = require("mongoose");
const Album = Mongoose.model(process.env.ALBUM_MODEL);
const CODE = require("../../constant/status.code");
const Message = require("../../constant/message");

const getAllSongs = (req, res) => {
    let albumId = req.params.albumId;
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
        let filter = {
            songs: {
                $slice: [offset * size, size]
            }
        }
        Album.findById(albumId, filter)
            .then((data) => { res.status(CODE.STATUS_OK).json({ data: data.songs, size: size, offset: offset }); })
            .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: err }); })
    }
}

const addSong = (req, res) => {
    let albumId = req.params.albumId;
    let song = req.body;

    if (!song.title || !song.length) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_TITLE_LENGTH })
    }
    Album.findById(albumId).select(process.env.SUB_DOCUMENT_SONGS)
        .then((data) => {
            let songs = data.songs;
            song._id = new Mongoose.Types.ObjectId()
            songs.push(song);
            return data.save()
        })
        .then((_data) => { res.status(CODE.STATUS_OK).json({ message: Message.MSG_ADD_SUCCESS }); })
        .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: err }); })
}

const getSongById = (req, res) => {
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    Album.findById(albumId).select(process.env.SUB_DOCUMENT_SONGS)
        .then((data) => {
            if (data == null) {
                res.status(CODE.STATUS_NOT_FOUND).json({ message: Message.MSG_NOT_FOUND_ID });
            } else {
                let songs = data.songs;
                const objectId = Mongoose.Types.ObjectId.createFromHexString(songId);
                let indexSong = songs.findIndex((song) => song._id.equals(objectId));
                if (indexSong == -1) {
                    res.status(CODE.STATUS_NOT_FOUND).json({ message: `There is no song with id: ${songId}` });
                } else {
                    res.status(CODE.STATUS_OK).json({ data: songs[indexSong] });
                }
            }
        })
        .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: err }); })
}

const deleteSongById = (req, res) => {
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    Album.findById(albumId).select(process.env.SUB_DOCUMENT_SONGS)
        .then((data) => {
            let songs = data.songs;
            const objectId = Mongoose.Types.ObjectId.createFromHexString(songId);
            let indexSong = songs.findIndex((song) => song._id.equals(objectId));
            songs = songs.splice(indexSong, 1);
            data.save()
        })
        .then((_data) => { res.status(CODE.STATUS_OK).json({ message: Message.MSG_DELETE_SUCCESS }); })
        .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: err }); });
}

const updateFullySong = (req, res) => {
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    let song = req.body;
    if (!song.title || !song.length) {
        return res.status(CODE.STATUS_BAD_REQUEST).json({ message: Message.MSG_INVALID_TITLE_LENGTH })
    }
    Album.findById(albumId).select(process.env.SUB_DOCUMENT_SONGS)
        .then((data) => {
            let songs = data.songs;
            const objectId = Mongoose.Types.ObjectId.createFromHexString(songId);
            let indexSong = songs.findIndex((song) => song._id.equals(objectId));
            songs[indexSong].title = song.title;
            songs[indexSong].length = song.length;
            return data.save();
        })
        .then((_data) => { res.status(CODE.STATUS_OK).json({ message: Message.MSG_UPDATE_SUCCESS_FULL }); })
        .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: Message.MSG_SERVER_ERROR }); });
}

const updatePartialySong = (req, res) => {
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    let song = req.body;

    Album.findById(albumId).select(process.env.SUB_DOCUMENT_SONGS)
        .then((data) => {
            let songs = data.songs;
            const objectId = Mongoose.Types.ObjectId.createFromHexString(songId);
            let indexSong = songs.findIndex((song) => song._id.equals(objectId));
            if (song.title) {
                songs[indexSong].title = song.title;
            }

            if (song.length) {
                songs[indexSong].length = song.length;
            }
            return data.save()

        })
        .then((_data) => { res.status(CODE.STATUS_OK).json({ message: Message.MSG_UPDATE_SUCCESS_FULL }); })
        .catch((err) => { res.status(CODE.STATUS_SERVER_ERROR).json({ message: err }); });
}
module.exports = {
    addSong,
    getAllSongs,
    getSongById,
    deleteSongById,
    updateFullySong,
    updatePartialySong
}