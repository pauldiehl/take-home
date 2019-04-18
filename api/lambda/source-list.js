'use strict';

const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('db.sqlite');
const exporter = sqliteJson(db);

const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  //Construct db query
  const sqlStmt = 'SELECT id, name FROM source ORDER BY created_at DESC'
  
  console.log(sqlStmt)
  
  //Execute query
  execution(exporter, sqlStmt, callback)
    
};