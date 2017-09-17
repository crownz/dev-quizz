const request = require('request');
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';
import { getProgressIfExists, updateAnswer, calculateResult } from './progress';

const compiler = webpack(config());
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(webpackDevMiddleware(compiler, { publicPath: config().output.publicPath }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/progress/:name', (req, res) => {
  setTimeout(() => {
    let result = getProgressIfExists(req.params.name);
    res.send(result);
  }, 100);
});

app.get('/api/result/:name', (req, res) => {
  setTimeout(() => {
    let result = calculateResult(req.params.name);
    res.send(result);
  }, 100);
});

app.put('/api/progress', (req, res) => {
  const { name, id, value, valid } = req.body;
  const updated = updateAnswer(name, id, value, valid);
  res.send(updated);
});

app.put('/api/validate', (req, res) => {
  const { html } = req.body;
  const options = {
    url: 'https://validator.nu?out=json',
    method: 'POST',
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'text/html; charset=utf-8'
    },
    body: html
  };

  request(options).pipe(res);
});

app.get('*', (req, res) => {
  res.render('index', {});
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
