const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	},
	subsidiary: {
		type: Number
	},
	name_subsidiary: {
		type: String
	},
	expenseAccount: {
		type: Number
	},
	name_expenseAccount: {
		type: String
	}
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;