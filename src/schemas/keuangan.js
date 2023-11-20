const {Schema, model} = require('mongoose');
const keuanganSchema = new Schema({
    _id: Schema.Types.ObjectId,
    uangPutih: String,
    uangMerah: String,
})

module.exports = model('Keuangan',keuanganSchema , "keuangan");