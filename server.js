const app = require("./app");

const mongoose = require("mongoose");

// mongodb+srv://test-user:test-user-password@testdb.o96x5hf.mongodb.net/db-contacts
const connection = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
