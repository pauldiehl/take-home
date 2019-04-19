'use strict';

const execution = require('../utility/execution')

exports.handler = (event, context, callback) => {
  
  //Construct db query
  const sqlStmt = 'SELECT id, name FROM source ORDER BY created_at DESC'
  
  console.log(sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
    
};