import path from 'path';
import { Server } from 'http';
import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';

const compiler = webpack(config());
const app = new Express();
const server = new Server(app);

app.use(webpackDevMiddleware(compiler, { publicPath: config().output.publicPath }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index', {  });
});

const progress = {
  done: [1, 2, 5, 6]
};

app.get('/progress', (req, res) => {
  setTimeout(() => res.send(progress), 2000);
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
