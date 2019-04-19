'use strict';

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
  const sqlStmt = 'SELECT id, message, status FROM message WHERE source_id = "' + id + '" ORDER BY updated_at DESC'
  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
  
};