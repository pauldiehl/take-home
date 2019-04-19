const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('db.sqlite');
const exporter = sqliteJson(db);

module.exports = (sqlStmt, callback) => {
    exporter.json(sqlStmt, (err, results) => {
    if (err) {
      console.error(err)
      callback({
        statusCode: 501,
        headers: { 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'text/plain' },
        body: err,
      })
    }
    else {
      callback (null, { 
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true },
        body: results
      })
    }
    return;
  })
}