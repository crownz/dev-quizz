import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
var request = require('request');
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';
import { getProgressIfExists, updateAnswer } from './progress';

const compiler = webpack(config());
const app = new Express();
const server = new Server(app);

app.use(webpackDevMiddleware(compiler, { publicPath: config().output.publicPath }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index', {  });
});

app.get('/progress/:name', (req, res) => {
  setTimeout(() => {
    let result = getProgressIfExists(req.params.name);
    res.send(result);
  }, 100);
});

app.put('/progress', (req, res) => {
  const { name, id, value } = req.body;
  const updated = updateAnswer(name, id, value);
  res.send(updated);
});

app.put('/validate', (req, res) => {
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

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
