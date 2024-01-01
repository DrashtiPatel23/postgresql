const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgresqldb",
  password: "123",
  port: 5432,
});
// pool.on("connect", () => {
//   console.log("DB Connect Successfully");
// });

pool.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
    query: (text, params) => pool.query(text, params),
  };
