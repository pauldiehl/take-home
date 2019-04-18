const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const ListMessage = require('../lambda/message-list')

describe('GET /message ::', () => {
    
    it('should successfully lists messages ::', () => {
     
        return LambdaTester(ListMessage.handler)
            .expectResult(result => {
                // console.log(':: result ::', result ) // too long of result
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})