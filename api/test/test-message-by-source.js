const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const MessageBySource = require('../lambda/message-by-source')

describe('GET /source/:id/message ::', () => {
    
    it('Fails to validate data ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 0 } }
        
        return LambdaTester(MessageBySource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('Successfully view messages by source id ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 'f7516443-c498-4493-9acc-c854ca2e873a' } }
        
        return LambdaTester(MessageBySource.handler)
            .event(testEvent)
            .timeout(10)
            .expectResult(result => {
                //console.log(':: result ::', result ) //long result set
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})