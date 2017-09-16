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
  demo: {

  }
};

app.get('/progress/:name', (req, res) => {



  setTimeout(() => {
    console.log("param:", req.params.name);
    let result = progress[req.params.name];
    console.log("existed? ", result, getQuestions());
    // result = result || getQuestions().forEach(q => delete q.answer);
    result = result || getQuestions();

    console.log("Returning!", result);
    res.send(result);
  }, 100);
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

function getQuestions() {
  return [
    {
      id: 'q1',
      label: 'A programmer is to a computer as a teacher is to:',
      type: 'variants',
      variants: [
        {
          label: 'A desk',
          value: 'desk'
        },
        {
          label: 'A student',
          value: 'student'
        },
        {
          label: 'A library',
          value: 'library'
        },
        {
          label: 'A principal',
          value: 'principal'
        }
      ],
      answer: 'student'
    }
  ];
}
