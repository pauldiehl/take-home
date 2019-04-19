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
  const sqlStmt = 'DELETE FROM source WHERE id = "' + id + '"'
  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
  
};