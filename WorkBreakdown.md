Work Breakdown Plan

REQUIREMENTS:
Backend: Endpoints -> Methods
- GET localhost:8888/source -> sourceList
- GET localhost:8888/source/:id -> sourceView
- GET localhost:8888/source/:id/message -> messageBySource (should sort data by updated)
- GET localhost:8888/source/:id/message/statusAggregate -> messageStatusAggregate
- POST localhost:8888/source -> sourceCreate
- PUT localhost:8888/source/:id -> sourceUpdate
- DELETE localhost:8888/source/:id -> sourceDelete
- GET localhost:8888/message -> messageList
- GET localhost:8888/message/:mid -> messageView


Frontend: views
- ListSource - Allow a user to view all sources (GET localhost:8888/source )
- ViewSource - Allows a user to view a single source with:
a) details, b) all messages, c) aggregate message status 
(GET localhost:8888/source/:id & GET localhost:8888/source/:id/message)


DESIGN DECISIONS:
Backend:
- Platform = AWS: Highly availability (performs/reliable), elastic (scales), Pay-As-You-Go (cheap), Native Cloud Services (low maintenance), Infrastructue as Code (transparent)
- API Service = API Gateway: Native cloud service -> Simple set-up, configuration lives in single documentation (no need for code)  (With Express.js, I would need to manage (1) code, (2) underlying server(s) and (3) configuration to scale servers)
- Compute Service = Lambda Functions: Native cloud service -> Simple set-up, permits direct testing and nothing else
- Runtime = NodeJS 8: Performs, JS is Cross Functional, Well-Supported
- Framework = Serverless Framework AWS CLI for building quick serverless apps; packages/deploys apps to AWS by wrapping a CloudFormation templates; supports LOCAL testing of API Gateway and Lamdba
- Environment = Cloud9 IDE on t2 Linux. Use Serverless Offline to deploy local
- Unit Testing Framework = Mocha
- TDD assertion library = Chai
- Mocking Libraries = Lambda-Tester (for Lambdas)

Frontend:
- UI Library = ReactJS: Reusable components and Fast rendering with Virtual DOM (on state changes, React only changes UI that need changing)
- Starter Pack = Create-React-App: quickly build react app, webpack/babel is preconfigured and hidden
- Routing = React-Router: Simple routing tool
- Environment: Cloud9 IDE
- Testing: React-Testing-Library (https://github.com/kentcdodds/react-testing-library)

CONSTRUCTION:
Backend:
- Created and tested SQL queries on database (DB Browser for SQLite)
- Initialized serverless project
- Installed dependendencies: sqlite3, sqlite-json, uuid
- Installed dev dependencies: serverless-offline, mocha, chai, lambda-tester
- Created file structure: /lambda, /test, /utility
- Constructed lambda with dummy response
- Constructed test (imported lambda) to test execution
- Added query and execution to Lambda
- Modified test to reflect changes
- Refactored out potential repeat sections to /utility
- With tests running (happy paths and invalid data tests), created API endpoints on 'serverless.yml'

Frontend:
- Designed 2 views: listSource and viewSource
- Created create-react-app project (npx create-react-app client)
- Installed react-router
- Created 2 blank class components for each view (listSource and viewSource)
- Add links on App.js to navigate between components
- For each view, 
a) Added constructor to build state,
b) Added rendering to view state, 
c) Added fetch of data to ComponentDidMount
