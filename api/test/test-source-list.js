const LambdaTester = require('lambda-tester');
const assert = require('chai').assert;

// Import lambda functions
const ListSource = require('../lambda/source-list')

describe('GET /source ::', () => {
    
    it('should successfully lists sources ::', () => {
     
        return LambdaTester(ListSource.handler)
            .expectResult(result => {
                console.log(':: result ::', result.body)
                assert.isArray(JSON.parse(result.body), 'Expecting result set as array')
                assert.equal(result.statusCode, 200)
            })
    })
})