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
                res.json({ message: 'failure' });
                return res.status(404).send();
            }
            res.user = user;
            res.json({ message: 'success' });
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
};