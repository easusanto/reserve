var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var reservationSchema = new Schema({
    username: {type: String},
    restaurant_name:  {type: String, unique: true},
    section_of_venue: {type: String},   //part or all or NA
    catering: {type: Boolean},          //true or false or NA
    catering_options: {type: Schema.Types.Mixed},   //json format
    date: {type: Date},
    start_time: {type: String},
    end_time: {type: String},
    number_of_people: {type: Number},
    requests: {type: String},
});

var Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;