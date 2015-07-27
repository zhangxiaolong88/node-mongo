var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var GameSchema = new Schema({
	name: String,
	version: Number,
	company: {
		name: String
	},
	create_date: {
		type: Date,
		default: Date.now
	},
	author: [{
		type: Schema.Types.ObjectId,
		ref: 'Author'
	}]
});

module.exports = mongodb.mongoose.model("Game", GameSchema);