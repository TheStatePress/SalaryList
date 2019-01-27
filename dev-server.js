const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({origin: true}));
app.use((req, res, next) => {console.log(req.url); next();});
app.use(express.static('./data-json'));

app.listen(8000, () => {console.log('serving data-json over localhost:8000')});
