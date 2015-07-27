var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var AuthorSchema = new Schema({
	name: String,
	org: [{
		type: Schema.Types.ObjectId,
		ref: 'Organization'
	}]
});

module.exports = mongodb.mongoose.model("Author", AuthorSchema);