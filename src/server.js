import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';

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

const progress = {
  demo: {

  }
};

app.get('/progress/:name', (req, res) => {
  setTimeout(() => {
    let result = progress[req.params.name];
    if (!result) {
      result = getQuestions();
      result.forEach(question => delete question.answer);
      progress[req.params.name] = result;
    }
    res.send(result);
  }, 100);
});

app.put('/progress', (req, res) => {
  console.log("REQ: ", req.body);
  const payload = req.body;
  const updated = updateAnswer(payload.name, payload.id, payload.value);
  res.send(updated);
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

function updateAnswer(name, id, value) {
  const question = progress[name].find(questions => questions.id === id);
  question.selected = value;
  return question;
}

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
      selected: '',
      answer: 'student'
    },
    {
      id: 'q2',
      label: 'Imagine a car as a computer, and its engine as a program. Which of the following is an input for the engine program?',
      type: 'variants',
      variants: [
        {
          label: 'The gas pedal',
          value: 'pedal'
        },
        {
          label: 'The driver\'s seat',
          value: 'seat'
        },
        {
          label: 'The steering wheel',
          value: 'wheel'
        },
        {
          label: 'The windshield wipers',
          value: 'wipers'
        }
      ],
      selected: '',
      answer: 'pedal'
    },
    {
      id: 'q3',
      label: 'A good algorithm must be:',
      type: 'variants',
      variants: [
        {
          label: 'Detailed',
          value: 'detailed'
        },
        {
          label: 'Replaceable',
          value: 'replaceable'
        },
        {
          label: 'Simple',
          value: 'simple'
        },
        {
          label: 'Open-ended',
          value: 'open-ended'
        }
      ],
      selected: '',
      answer: 'detailed'
    }
  ];
}
