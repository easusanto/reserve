module.exports = function(app, Login) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });
    app.use('/api', function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });
    app.get('/api', function(req, res) {
        res.json({ message: 'POOP! welcome to our api!' });   
    });


    app.route('/api/login')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var login = new Login();      // create a new instance of the Bear model
        login.username = req.body.username;  // set the bears name (comes from the request)
        login.password = req.body.password;

        // save the bear and check for errors
        login.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Login tested!' });
        });
        
    });


};