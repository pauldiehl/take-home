const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const ViewMessage = require('../lambda/message-view')

describe('GET /message/:id ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 0 } }
        
        return LambdaTester(ViewMessage.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully view message by id ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : '23fc65c2-29bf-4208-85ec-b54629b76bc1' } }
        
        return LambdaTester(ViewMessage.handler)
            .event(testEvent)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})