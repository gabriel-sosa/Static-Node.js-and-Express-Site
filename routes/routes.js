//initial requirements
const express = require('express');
const router = express.Router();
const data = require('../data.json');
//index route
router.get('/', (req, res) => {
	return res.render('index', {data});
});
//about route
router.get('/about', (req, res) => {
	return res.render('about');
});
//projects route, if porject was not fount gives an error
router.get('/project/:id', (req, res, next) => {
	for (var i = 0; i < data.length; i++) {
		if (req.params.id === data[i].id){
			return res.render('project', data[i]);
		}
	}
	const err = new Error(`Project "${req.params.id}" Not Found`);
	err.status = 404;
	return next(err);
});
//if the user searches a non existing page throws an error
router.use((req, res, next) => {
	const err = new Error('Page Not Found');
	err.status = 404;
	return next(err);
})
//error handler
router.use((err, req, res, next) => {
	res.status(err.status);
	console.log(`an error just happend: ${err.status}, ${err.message}`);
	return res.render('error', {status: err.status, message: err.message, stack: err.stack});
})
//return the routes
module.exports = router;