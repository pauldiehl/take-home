module.exports = (exporter, sqlStmt, callback) => {
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