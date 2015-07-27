var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var OrgSchema = new Schema({
	name: String
});

module.exports = mongodb.mongoose.model("Organization", OrgSchema);