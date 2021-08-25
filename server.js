const express = require('express');
const app = express();
// const route = require('./app/router');
const cors = require('cors');
var swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml');
const path = require('path');

const fs   = require('fs');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDocument = yaml.load(spec);
const swaggerTools = require('swagger-tools');


app.use(express.json());
// app.use(cors());

const server = require('http').Server(app); // const server = http.Server(app)  é a mesma coisa
// app.use(route);

swaggerTools.initializeMiddleware(swaggerDocument, function (middleware) {

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, true)); //show explorer
  
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
  
    // Provide the security handlers
    // app.use(middleware.swaggerSecurity(auth.baseConfigSecurity()));
  
    // Validate Swagger requests
    // app.use(middleware.swaggerValidator({
    //     validateResponse: false
    // }));
    
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({ controllers: path.join(__dirname, './app/controllers'), useStubs: false }));
  
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  });
  

server.listen(process.env.PORT || 222);