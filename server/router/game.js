module.exports = function(app) {
	var gameManager = require('../manager/game');

	// 获取游戏列表
	app.get("/game/getGames", gameManager.getGames);

	// 保存游戏
	app.post("/game/saveGame", gameManager.saveGame);

	// 删除游戏
	app.get("/game/deleteGame", gameManager.deleteGame);
};