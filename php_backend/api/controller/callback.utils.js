const Mongoose = require("mongoose");
const Album = Mongoose.model("Album");
const Message = require("../../constant/message");
const callbackify = require("util").callbackify;

const GetAllAlbumsWithCallBack = callbackify((offset, size) => {
    return Album.find().skip(offset * size).limit(size).exec();
});

const GetAlbumByIdWithCallBack = callbackify((id) =>{
    return Album.findById(id).exec();
});

const AddAlbumWithCallBack = callbackify((album) => {
    return Album.create(album);
});

const DeleteAlbumByIdWithCallBack = callbackify((id) => {
    return Album.findByIdAndDelete(id);
});

const UpdatePartialyAlbumWithCallBack = callbackify((id, album) => {
    return Album.findByIdAndUpdate(id, album);
});

const UpdateFullyAlbumWithCallBack = callbackify((id, album) => {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(Message.MSG_INVALID_ID)
    }
    const objectId = Mongoose.Types.ObjectId.createFromHexString(id);
    return Album.findOneAndReplace({_id: objectId}, album);
});

const GetAllSongsByAlbumWithCallBack = callbackify((id) =>{
    return Album.findById(id).select(process.env.SUB_DOCUMENT_SONGS).exec();
});

module.exports = {
    GetAlbumByIdWithCallBack,
    GetAllAlbumsWithCallBack,
    AddAlbumWithCallBack,
    DeleteAlbumByIdWithCallBack,
    UpdateFullyAlbumWithCallBack,
    UpdatePartialyAlbumWithCallBack,
    GetAllSongsByAlbumWithCallBack,
}