const path = require("path");
const express = require("express");
const app = express();
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv").config();
const cors = require("cors");

const graphqlSchema = require("./schema/graphqlSchema");
const connectDB = require("./config/db");

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.use("/", (req, res) => {
    res.send("PLEASE SET TO PRODUCTION");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`.magenta);
});
