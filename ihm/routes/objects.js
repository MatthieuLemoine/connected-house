var express  = require('express');
var router   = express.Router();

// Routing

router.get('/',objects);
router.get('/count',objectsCount);

module.exports = router;

// Handlers

// GET objects
function objects(req,res){
	// Query DB
  var objs = [
		{
			id : 1,
			custom : 'attribute'
		},
		{
			id : 1,
			custom : 'attribute'
		}
	];
	// Render JSON
	res.json(objs);
}

// GET objects count
function objectsCount(req,res){
		// Query DB
		var objs = [
			{
				id : 1,
				custom : 'attribute'
			},
			{
				id : 1,
				custom : 'attribute'
			}
		];
		var count = objs.length;
		// Render JSON
		res.json({count:count});
}
