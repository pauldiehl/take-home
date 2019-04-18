const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const CreateSource = require('../lambda/source-create')

describe('POST /source ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { "body" : '{ "name": null, "environment": null, "encoding": null }' }
        
        return LambdaTester(CreateSource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully create source ::', () => {
        let testEvent = { "body" : '{ "name": "henry", "environment":"hoops", "encoding":"yikes" }' }
        
        return LambdaTester(CreateSource.handler)
            .event(testEvent)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})