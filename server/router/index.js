/** 
 * 总路由
 */

module.exports = function(app) {
	app.get('/', function(req,res){
		res.render('index', { title: 'Mongo' });
	})
	// 所有路由
	require('./game')(app);
};