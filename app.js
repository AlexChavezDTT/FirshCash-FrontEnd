const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
dotenv.config({ path: './config.env' });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASWWORD_DATABASE);
//CONEXION DB EN MONGO ATLAS
/* mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => console.log("Conexion exitosa de mongo")); */

//CONEXION EN MONGO LOCAL
mongoose.connect(process.env.DATABASE_LOCAL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => console.log("Conexion exitosa de mongo"));

//1)MIDDLEWARES
app.use(morgan('common'));
app.use(express.json());
app.use((req, res, next) => {
	console.log('Hello from the middleware');
	next();
});

//3) ROUTES
app.get("/", (req, res) => {
	//res.status(404);
	res.json({ message: "Welcome to Jaime C. application." });
});

require("./routes/employees.routes")(app);
require("./routes/reports.routes")(app);
require("./routes/subsidiary.routes")(app);
require("./routes/currencys.routes")(app);
require("./routes/locations.routes")(app);
require("./routes/deparments.routes")(app);
require("./routes/categories.routes")(app);
require("./routes/nexus.routes")(app);
require("./routes/taxes.routes")(app);


//4) START SERVER
app.set('port', process.env.PORT || 3001);
// set port, listen for requests
app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`);
});