let mongoose = require('mongoose');

let urlSchema = mongoose.Schema({
    originalUrl: String,
    shortUrl: String
}, {
    collection: 'urls'
});

module.exports = mongoose.model('Urls', urlSchema);

