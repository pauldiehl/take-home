'use strict';

const validationCallback = require('../utility/validation')
const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  const id = event['pathParameters']['id']
  const data = JSON.parse(event.body)
  
  console.log('input data: ' + event.body)
  console.log('input id: ' + id)
  
  // Validate data types
  if (typeof id !== 'string'
  || typeof data['name'] !== 'string' 
  || typeof data['environment'] !== 'string' 
  || typeof data['encoding'] !== 'string') {
    validationCallback(callback) 
    return
  }
  
  //Construct db query
  const sqlStmt = 'UPDATE source SET name = "'
    + data['name'] + '", environment = "'
    + data['environment'] + '", encoding = "'
    + data['encoding'] + '" WHERE id = "'
    + id + '"'
  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
    
};