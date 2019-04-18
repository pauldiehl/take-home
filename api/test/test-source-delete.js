const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const DeleteSource = require('../lambda/source-delete')

describe('DELETE /source/:id ::', () => {
    
    it('should fail to validate data ::', () => {
        let testEvent = { 'pathParameters' : { 'id' : 0 } }
        
        return LambdaTester(DeleteSource.handler)
            .event(testEvent)
            .expectError(result => {
                console.log(':: error ::', result.body)
                assert.equal(result.body, 'Invalid type set')
                assert.equal(result.statusCode, 400)
            })
    })
    
    it('should successfully deletes source by id ::', () => {
        //TO DO: SAVE 'id' from test-source-create
        let testEvent = { 'pathParameters' : { 'id' : 'd2fdf650-6114-11e9-973a-771681751b0f' } }
        
        return LambdaTester(DeleteSource.handler)
            .event(testEvent)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})