'use strict';

const uuid = require('uuid');
const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('db.sqlite');
const exporter = sqliteJson(db);

const validationCallback = require('../utility/validation')
const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  const data = JSON.parse(event.body)
  
  console.log('input data: ' + event.body)
  
  // Validate data types
  if (typeof data['name'] !== 'string' 
  || typeof data['environment'] !== 'string' 
  || typeof data['encoding'] !== 'string') {
    validationCallback(callback) 
    return
  }
  
  //Construct db query
  const sqlStmt = 'INSERT INTO source (id, name, environment, encoding) VALUES ("'
    + uuid.v1() + '","'
    + data['name'] + '","'
    + data['environment'] + '","'
    + data['encoding'] + '")'
  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(exporter, sqlStmt, callback)
    
};