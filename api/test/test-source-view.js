const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const ViewSource = require('../lambda/source-view')

describe('GET /source/:id ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 0 } }
        
        return LambdaTester(ViewSource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully view source by id ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 'f7516443-c498-4493-9acc-c854ca2e873a' } }
        
        return LambdaTester(ViewSource.handler)
            .event(testEvent)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})