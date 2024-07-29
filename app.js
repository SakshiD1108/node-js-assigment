const express = require('express');
const bodyParser = require('body-parser');
const numberRoutes = require('./routes/number.route');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', numberRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
