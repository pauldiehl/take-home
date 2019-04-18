
INSTRUCTIONS TO RUN:

###LOCAL###

*SET-UP*
clone project
Install and Run Node 8 (mac/linux: nvm use 8)
Install serverless globally (npm install serverless -g)

*RUN & TEST BACKEND*
cd api
npm install
(RUN TESTS) npm test
(START LOCAL API): sls offline start
(HIT API): 
curl localhost:3000/source
curl localhost:3000/source/ae6218b0-6116-11e9-9bb7-75218fd118fe
curl -X POST localhost:3000/source --data '{ "name": "henry", "environment":"hoops", "encoding":"yik" }'
curl -X PUT localhost:3000/source/ae6218b0-6116-11e9-9bb7-75218fd118fe --data '{ "name": "bob", "environment":"hoops2", "encoding":"yikes" }'
curl -X DELETE localhost:3000/source/ae6218b0-6116-11e9-9bb7-75218fd118fe
curl localhost:3000/source/80fe6e1e-6f1b-4b3c-957c-275d12bb3e48/message
curl localhost:3000/message
curl localhost:3000/message/23fc65c2-29bf-4208-85ec-b54629b76bc1

*RUN FRONTEND*
cd client
npm install
npm start
open browser to localhost:8080


###LIVE DEMO###
S3 URL: 
APIG URL: 
