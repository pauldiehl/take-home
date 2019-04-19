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
  const sqlStmt = 'SELECT errorCount, enqueuedCount, processingCount, finishedCount ' 
  + 'FROM (SELECT COUNT(*) as errorCount FROM message where source_id = "' + id + '" AND status = "error") ERR'
    + 'CROSS JOIN (SELECT COUNT(*) as enqueuedCount FROM message where source_id = "' + id + '" AND status = "enqueued") ENQ'
      + 'CROSS JOIN (SELECT COUNT(*) as processingCount FROM message where source_id = "' + id+ '" AND status = "processing") PROC'
        + 'CROSS JOIN (SELECT COUNT(*) as finishedCount FROM message where source_id = "' + id + '" AND status = "finished") FIN'

  console.log('query to execute: ' + sqlStmt)
  
  //Execute query
  execution(sqlStmt, callback)
  
};