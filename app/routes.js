module.exports = function(app, User, Reservation) {

    app.post('/login', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username, password: password}, function(err, user){

            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!user){
                res.json({ message: 'failure' });
                return res.status(404).send();
            }
            res.user = user;
            res.json(user);
            return res.status(200).send();
        })
    });

    app.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var account_type = req.body.account_type;

        var newuser = new User();
        newuser.username = username;
        newuser.password = password;
        newuser.account_type = account_type;

        newuser.save(function(err, savedUser){
            if(err){
                console.log(err);
                return res.status(500).send();
            }

            res.json({ message: 'User created!' });
            return res.status(200).send();

        })
    });

    app.post('/get_restaurant_reservations', function(req, res){
        var restaurant_name = req.body.restaurant_name;
        Reservation.find({restaurant_name: restaurant_name}, function(err, reservation){
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!reservation){
                res.json({ message: 'failure' });
                return res.status(404).send();
            }
            res.reservation = reservation;
            res.json(reservation);
            return res.status(200).send();
        })
    });



    app.post('/approve_restaurant_reservation', function(req, res) {
        var confNum = req.body.confNum;

        Reservation.update({'confNum':req.body.confNum},{$set:{"approval":true}}, { upsert: false }, function (err, updated) {
            if(err){
                console.log("Error: ", err);
                return res.status(500).send();
            }
            if(!updated){
                res.json({ message: 'failure' });
                return res.status(404).send();
            }
            res.updated = updated;
            res.json(updated);
            return res.status(200).send();

        });
    });

    app.post('/cancel_approve_restaurant_reservation', function(req, res) {
    var confNum = req.body.confNum;

    Reservation.update({'confNum':req.body.confNum},{$set:{"approval":false}}, { upsert: false }, function (err, updated) {
        if(err){
            console.log("Error: ", err);
            return res.status(500).send();
        }
        if(!updated){
            res.json({ message: 'failure' });
            return res.status(404).send();
        }
        res.updated = updated;
        res.json(updated);
        return res.status(200).send();

    });
});

    app.post('/get_user_reservations', function(req, res){
        var username = req.body.username;
        console.log(username);
        Reservation.find({username: username}, function(err, reservation){
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!reservation){
                res.json({ message: 'failure' });
                return res.status(404).send();
            }
            res.reservation = reservation;
            res.json(reservation);
            return res.status(200).send();
        })
    });



    app.post('/send_user_reservations', function(req, res) {
        var confNum = req.body.confNum;
        var restaurant_name = req.body.restaurant_name;
        var username = req.body.username;
        var section_of_venue = req.body.section_of_venue;   //part or all or NA
        var floor = req.body.floor;
        var catering = req.body.catering;                   //true or false or NA
        var catering_options = req.body.catering_options    //json format
        var date = req.body.date;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var number_of_people = req.body.number_of_people;
        var price= req.body.price;
        var floor = req.body.floor;
        var approval = req.body.approval;

        var newreservation = new Reservation();
        newreservation.confNum = confNum;
        newreservation.username = username;
        newreservation.restaurant_name = restaurant_name;
        newreservation.section_of_venue = section_of_venue;
        newreservation.floor = floor;
        newreservation.catering = catering;
        newreservation.catering_options = catering_options;
        newreservation.date = date;
        newreservation.start_time = start_time;
        newreservation.end_time = end_time;
        newreservation.number_of_people = number_of_people;
        newreservation.price = price;
        newreservation.approval = approval;

        console.log("THIS IS MY RESERVATION: ", newreservation);
        newreservation.save(function(err, savedReservation){
            if(err){
                console.log(err);
                res.json({  message: err});
                return res.status(500).send();
            }

            res.json({ message: 'Reservation created!' });
            return res.status(200).send();

        })
    });
};
