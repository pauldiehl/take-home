const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const UpdateSource = require('../lambda/source-update')

describe('PUT /source ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { 
            "body" : '{ "name": null, "environment": null, "encoding": null }', 
            "pathParameters" : { 'id' : 0 }
        }
        
        return LambdaTester(UpdateSource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully updates source by id ::', () => {
        let testEvent = { 
            "body" : '{ "name": "bob", "environment": "tropical", "encoding": "sup" }', 
            "pathParameters" : { "id" : "88249a00-610d-11e9-8ac2-29a5708104c4" }
        }
        return LambdaTester(UpdateSource.handler)
            .event(testEvent)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})