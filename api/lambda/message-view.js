'use strict';

const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('db.sqlite');
const exporter = sqliteJson(db);

const validationCallback = require('../utility/validation')
const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  const id = event['pathParameters']['id']
  console.log('input id: ' + id)
  
  // Validate data types
  if (typeof id !== 'string') {
    validationCallback(callback)
    return
  }
  
  //Construct db query
  const sqlStmt = 'SELECT id, message, status FROM message WHERE id = "' + id + '"'
  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(exporter, sqlStmt, callback)
  
};