const express = require('express');
const app = express();
const route = require('./app/router');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const SwaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(cors());

const server = require('http').Server(app); // const server = http.Server(app)  é a mesma coisa
app.use(route);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SwaggerDocument))
server.listen(process.env.PORT || 2222);