var Game = require("../model/Game.js");
var Author = require("../model/Author.js");
var Org = require("../model/Organization.js");

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
	/*Game.findOne({name: "测试"})
	.populate("author")
	.exec(function(err,obj){
		if(err){
			console.log(err);
		} else {
			console.log(obj.author[0]._id);
			Author.findOne({_id: obj.author[0]._id}).exec(function(err2,obj2){
				if(err2){
					console.log(err2);
				} else {
					console.log(obj2);
				}
			});
		}
	});*/
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
		var g = new Game(game);
		g.save(function(err) {
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

		/*var o = new Org({
			name: "公益组织"
		});
		o.save(function(err) {
			if (err) {
				console.log("保存org失败");
			} else {
				var a = new Author({
					name: "张小龙"
				});
				a.org.push(o);
				a.save(function(err) {
					if (err) {
						console.log("保存Author失败");
					} else {
						var g = new Game(game);
						g.author.push(a);
						g.save(function(err) {
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
				});
			}
		});*/

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