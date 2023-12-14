const {Schema, model} = require('mongoose');
const anggotaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nama: String,
    steamhex: String,
    nomorhp: String,
    posisi: String,
    foto: String,
    discordid: String,
})

module.exports = model('Anggota',anggotaSchema , "anggota");