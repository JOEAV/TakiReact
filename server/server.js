const express = require('express');
const _ = require('lodash');
const session = require('express-session');
const parser = require('parser');
const app = express();




app.use(express.static(path.resolve(__dirname, "..", "public")));

