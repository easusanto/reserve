module.exports = function(app, User) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });
    // app.use('/api', function(req, res, next) {
    //     // do logging
    //     console.log('Something is happening.');
    //     next(); // make sure we go to the next routes and don't stop here
    // });
    // app.get('/api', function(req, res) {
    //     res.json({ message: 'POOP! welcome to our api!' });   
    // });


    app.post('/login', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username, password: password}, function(err, user){
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!user){
                res.json({ message: 'User/password is incorrect.' });
                return res.status(404).send();
            }

            res.json({ message: 'Login successful!' });
            return res.status(200).send();
        })
    });

    app.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        var newuser = new User();
        newuser.username = username;
        newuser.password = password;
        newuser.firstname = firstname;
        newuser.lastname = lastname; 

        newuser.save(function(err, savedUser){
            if(err){
                console.log(err);
                return res.status(500).send();
            }

            res.json({ message: 'User created!' });
            return res.status(200).send();

        })
    });
};