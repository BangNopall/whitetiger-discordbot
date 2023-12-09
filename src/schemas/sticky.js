const {Schema, model} = require('mongoose');
const stickySchema = new Schema({
    Message: String,
    ChannelID: String,
    LastMessage: String,
    LastMessageID: String,
    MaxCount: { type: Number, default: 6 },
    CurrentCount: { type: Number, default: 0 },
})

module.exports = model('Sticky',stickySchema , "sticky");