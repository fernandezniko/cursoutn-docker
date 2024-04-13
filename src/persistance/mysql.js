const mysql = require("mysql2");

let pool;

async function init() {
  const host = "mysqldb";

  pool = mysql.createPool({
        host: "mysqldb",
    user: "root",
    password: "secret",
    database: "factsdb",
        port: 3306,
  });

  return new Promise((acc, rej) => {
    pool.query(
      "CREATE TABLE IF NOT EXISTS facts (id varchar(36), description varchar(255))",
      (err) => {
        if (err) return rej(err);

        console.log(`Connected to mysql db at host ${host}`);
        acc();
      }
    );
  });
}

async function getFacts() {
  return new Promise((acc, rej) => {
    pool.query("SELECT * FROM facts", (err, rows) => {
      if (err) return rej(err);
      acc(rows.map((item) => Object.assign({}, item)));
    });
  });
}

async function storeFact(item) {
  return new Promise((acc, rej) => {
    pool.query(
      "INSERT INTO facts (id, description) VALUES (?, ?)",
      [item.id, item.description],
      (err) => {
        if (err) return rej(err);
        acc();
      }
    );
  });
}

async function removeFact(id) {
  return new Promise((acc, rej) => {
    pool.query("DELETE FROM facts WHERE id = ?", [id], (err) => {
      if (err) return rej(err);
      acc();
    });
  });
}

async function test() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT NOW()", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  init,
  getFacts,
  storeFact,
  removeFact,
  test,
};
