//Nerd.js communicates with the database
//Documentation: http://mongoosejs.com/docs/guide.html

// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
	name : {type : String, default: ''}
});


var Schema = mongoose.Schema;

var loginSchema = new Schema({
  username:  String,
  password: String
});

var login = mongoose.model('login', loginSchema);
//Modeul exports
module.exports = login;
