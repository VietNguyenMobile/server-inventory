const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

// Routes Inventory
const manufacturersRoutes = require("./routers/inventory/manufacturers");
const categoriesRoutes = require("./routers/inventory/categories");
const itemsRoutes = require("./routers/inventory/items");
const transactionsRoutes = require("./routers/inventory/transactions");
const transactionDetailsRoutes = require("./routers/inventory/transactionDetails");
const itemDetailsRoutes = require("./routers/inventory/itemDetails");
const rmasRoutes = require("./routers/inventory/rmas");

const api = process.env.API_URL;
const PORT = 3000;
const URL = `http://localhost:${PORT}`;

// Routers Inventory
app.use(`${api}/manufacturers`, manufacturersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/items`, itemsRoutes);
app.use(`${api}/transactions`, transactionsRoutes);
app.use(`${api}/transactionDetails`, transactionDetailsRoutes);
app.use(`${api}/itemDetails`, itemDetailsRoutes);
app.use(`${api}/rmas`, rmasRoutes);

// Model Inventory
const Manufacturer = require("./models/inventory/manufacturer");
const Item = require("./models/inventory/item");
const Rma = require("./models/inventory/rma");
const Category = require("./models/inventory/category");
const Transaction = require("./models/inventory/transaction");
const TransactionDetail = require("./models/inventory/transactionDetail");
const ItemDetail = require("./models/inventory/itemDetail");

const userName = "sop-user";
const password = "GDNHTwLg0VuzkgMl";
// const databaseName = "template-sop";
const databaseName = "inventory";

const URL_MongoDB = `mongodb+srv://${userName}:${password}@cluster0.ey18sdw.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

console.log("CONNECT_STRING: ", process.env.CONNECT_STRING);

mongoose
  .connect(process.env.CONNECT_STRING, {
    dbName: databaseName,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running ", URL);
});
