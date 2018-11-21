const express = require('express');
const router = express.Router();
const data = require('../data.json');

router.get('/', (req, res) => {
	res.render('index', {data});
});

router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/project/:id', (req, res, next) => {
	for (var i = 0; i < data.length; i++) {
		if (req.params.id === data[i].id){
			return res.render('project', data[i]);
		}
	}
	res.status(404);
	next(new Error('project not found'));
});

router.use((req, res, next) => {
	console.log('page not found');
	res.status(404);
	next(new Error('Page not found'));
})

router.use((err, req, res, next) => {
	return res.send(err.message);
})

module.exports = router;