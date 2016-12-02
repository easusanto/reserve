var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    username:  {type: String, unique: true},
    password: {type: String},
    account_type: {type: String}
});

var User = mongoose.model('user', userSchema);
module.exports = User;