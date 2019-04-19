'use strict';

const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  //Construct db query
  const sqlStmt = 'SELECT id, message FROM message ORDER BY created_at DESC'
  console.log(sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
    
};