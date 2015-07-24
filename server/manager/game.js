var Game = require("../model/Game.js");

exports.getGames = function(req, res) {
	var query = {};

	var gameName = req.query.gameName;
	if (gameName) {
		query.name = {
			$regex: gameName,
			$options: 'i'
		};
		// query.name = new RegExp(gameName);
	}

	var gameVersion1 = req.query.gameVersion1,
		gameVersion2 = req.query.gameVersion2;
	if (gameVersion1 || gameVersion2) {
		query.version = {
			$gte: parseInt(gameVersion1),
			$lte: parseInt(gameVersion2)
		};
	}

	var companyName = req.query.companyName;
	if (companyName) {
		query['company.name'] = {
			$regex: companyName,
			$options: 'i'
		};
	}
	Game.find(query).sort({
		create_date: "desc"
	}).exec(function(err, obj) {
		if (err) {
			res.send({
				'success': false,
				'err': err
			});
		} else {
			res.send({
				'success': true,
				'data': obj
			});
		}
	});
};

exports.saveGame = function(req, res) {
	var game = {
		name: req.body.name,
		version: req.body.version,
		'company.name': req.body.company
	};
	if (req.body._id) {
		Game.update({
			_id: req.body._id
		}, {
			$set: game
		}, function(err) {
			if (err) {
				res.send({
					'success': false,
					'err': err
				});
			} else {
				res.send({
					'success': true
				});
			}
		});
		/*var game = {
			name: req.body.name,
			version: req.body.version,
			company: {
				name: req.body.company
			}
		};
		Game.findOne({
			_id: req.body._id
		}, function(err, doc) {
			if (err) {
				res.send({
					'success': false,
					'err': err
				});
			} else {
				doc.set(game);
				doc.save();
				res.send({
					'success': true
				});
			}
		});*/
	} else {
		var instance = new Game(game);
		instance.save(function(err) {
			if (err) {
				res.send({
					'success': false,
					'err': err
				});
			} else {
				res.send({
					'success': true
				});
			}
		});
	}

};

exports.deleteGame = function(req, res) {
	var id = req.query.gameId;

	Game.remove({
		_id: id
	}, function(err) {
		if (err) {
			res.send({
				'success': false,
				'err': err
			});
		} else {
			res.send({
				'success': true
			});
		}
	});

};