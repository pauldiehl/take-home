const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const MessageBySource = require('../lambda/message-status-aggregate')

describe('GET /source/:id/message/statusAggregate ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 0 } }
        
        return LambdaTester(MessageBySource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully view messages by source id ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48' } }
        
        return LambdaTester(MessageBySource.handler)
            .event(testEvent)
            .timeout(10)
            .expectResult(result => {
                console.log(':: result ::', result.body ) 
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})