module.exports = (callback) => {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'text/plain' },
      body: 'Invalid type set',
    });
    return;
}