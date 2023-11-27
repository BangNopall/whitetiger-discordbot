const {Schema, model} = require('mongoose');
const brankasSchema = new Schema({
    _id: Schema.Types.ObjectId,
    barang: String,
    jumlah: String,
    kategori: String,
})

module.exports = model('Brankas',brankasSchema , "brankas");