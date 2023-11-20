const express = require("express");
const albumController = require("../controller/album.controller");
const songController = require("../controller/song.controller");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
router.route("/")
    .get(albumController.getAllAlbums)
    .post(authMiddleware.verifyToken, albumController.addAlbum);

router.route("/:albumId")
    .get(albumController.getAlbumById)
    .delete(authMiddleware.verifyToken, albumController.deleteAlbum)
    .patch(authMiddleware.verifyToken, albumController.updatePartialyAlbum)
    .put(authMiddleware.verifyToken, albumController.updateFullyAlbum);

router.route("/:albumId/songs")
    .get(songController.getAllSongs)
    .post(authMiddleware.verifyToken, songController.addSong);

router.route("/:albumId/songs/:songId")
    .get(songController.getSongById)
    .delete(authMiddleware.verifyToken, songController.deleteSongById)
    .put(authMiddleware.verifyToken, songController.updateFullySong)
    .patch(authMiddleware.verifyToken, songController.updatePartialySong);

module.exports = router;